package main

import (
	"errors"
	"fmt"
	"net/http"
	"path"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/cloudwego/kitex-examples/bizdemo/easy_note/pkg/errno"
	"github.com/gin-gonic/gin"
	"github.com/jianqianyan/Whiteboard/board-go/api/handlers"
	"github.com/jianqianyan/Whiteboard/board-go/controller"
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/pkg/constants"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func main() {
	Init(constants.MySQLDefaultDSN)
	//go run ./board-go/server.go
	r := gin.Default()
	r.POST("/upload", func(c *gin.Context) {
		// 获取上传文件信息
		f, err := c.FormFile("filename")
		// 限制每次处理文件所占用的最大内存
		r.MaxMultipartMemory = 1 << 20
		fmt.Println("filesize :=", f.Size)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		} else {
			dst := path.Join("./upload/", f.Filename)
			// 保存文件
			c.SaveUploadedFile(f, dst)
			c.JSON(200, gin.H{
				"msg":  "success",
				"name": f.Filename,
				"size": f.Size,
			})
		}
	})
	//上传笔刷数据
	r.POST("/brushAdd", func(c *gin.Context) {
		var body dao.Body
		if err := c.ShouldBind(&body); err != nil {
			fmt.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"message": "参数获取失败", "status": 400})
			return
		}
		if err, status := controller.ReleaseCreate(body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status})
			// 服务器出错
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "请求成功！ ", "status": 200})
	})
	//更新笔刷数据
	r.POST("/brushUpdate", func(c *gin.Context) {
		var body dao.Body
		if err := c.ShouldBind(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "参数获取失败", "status": "400"})
			return
		}
		if err, status := controller.ReleaseUpdate(body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "更新成功！ ", "status": 200})
	})
	//删除笔刷数据
	r.POST("/brushDelete", func(c *gin.Context) {
		var body dao.Body
		if err := c.ShouldBind(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "参数获取失败", "status": "400"})
			return
		}
		if err, status := controller.ReleaseDelete(body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "删除成功！ ", "status": 200})
	})
	//撤回上一步
	r.POST("/brushRecall", func(c *gin.Context) {
		if err, status := controller.ReleaseRecall(); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "撤回成功！ ", "status": 200})
	})
	//获取笔刷数据
	r.GET("/boardInit", func(c *gin.Context) {
		boardId := c.Query("boardId")
		data := controller.QueryBrushInfo(boardId)
		c.JSON(http.StatusOK, data)
	})
	//获取白板id
	r.GET("/boardIdGet", func(c *gin.Context) {
		userId := c.Query("userId")
		err, status, boardId := controller.ReleaseCreateBoardId(userId)
		type Data struct {
			BoardId string `json:"boardId"`
		}
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status, "data": &Data{BoardId: boardId}})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "成功获取白板Id！ ", "status": 200, "data": &Data{BoardId: boardId}})
	})
	//获取用户Id
	r.GET("/user/touristId", func(c *gin.Context) {
		err, status, userId := controller.ReleaseCreateUserId()
		type Data struct {
			UserId string `json:"userId"`
		}
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status, "data": &Data{UserId: userId}})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "成功获取userId！ ", "status": 200, "data": &Data{UserId: userId}})
	})
	authMiddleware, _ := jwt.New(&jwt.GinJWTMiddleware{
		Key:        []byte(constants.SecretKey),
		Timeout:    time.Hour,
		MaxRefresh: time.Hour,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*handlers.UserParam); ok {
				return jwt.MapClaims{
					constants.IdentityKey: v.Phone,
				}
			}
			return jwt.MapClaims{}
		},
		HTTPStatusMessageFunc: func(e error, c *gin.Context) string {
			switch e.(type) {
			case errno.ErrNo:
				return e.(errno.ErrNo).ErrMsg
			default:
				return e.Error()
			}
		},
		LoginResponse: func(c *gin.Context, code int, token string, expire time.Time) {
			c.JSON(http.StatusOK, map[string]interface{}{
				"status":  200,
				"message": "Success",
				"token":   token,
				"expire":  expire.Format(time.RFC3339),
			})
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, map[string]interface{}{
				"status":  errno.AuthorizationFailedErrCode,
				"message": message,
			})
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVar handlers.UserParam
			if err := c.Bind(&loginVar); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			if len(loginVar.Phone) == 0 || len(loginVar.PassWord) == 0 {
				return "", jwt.ErrMissingLoginValues
			}
			var user = repository.User{
				Phone:    loginVar.Phone,
				Password: loginVar.PassWord,
			}
			if repository.CheckUser(&user) {
				return &loginVar, nil
			}
			return "", errors.New("帐号或密码错误")
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			var user = repository.User{
				Phone:    data.(*handlers.UserParam).Phone,
				Password: data.(*handlers.UserParam).PassWord,
			}
			return repository.CheckUser(&user)
		},
		TokenLookup:   "header: Authorization, query: token, cookie: jwt",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	})
	user1 := r.Group("/user")
	user1.POST("/register", handlers.Register)
	user1.POST("/login", authMiddleware.LoginHandler)
	r.Run(":8080")
}

func Init(dsn string) error {
	if err := repository.Init(dsn); err != nil {
		return err
	}
	return nil
}
