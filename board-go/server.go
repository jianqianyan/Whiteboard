package main

import (
	"fmt"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/jianqianyan/Whiteboard/board-go/controller"
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

var Once = make(chan int, 1)

func main() {
	Init("ywg", "ywg123456", "120.26.83.87:3306", "try")
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
		println(boardId)
		data := controller.QueryBrushInfo(boardId)
		c.JSON(http.StatusOK, data)
	})
	//获取白板id
	r.GET("/boardIdGet", func(c *gin.Context) {
		userId := c.Query("userId")
		println(userId)
		Once <- 1
		err, status, boardId := controller.ReleaseCreateBoardId(userId)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "status": status, "boardId": boardId})
			return
		}
		<-Once
		c.JSON(http.StatusOK, gin.H{"message": "成功获取白板Id！ ", "status": 200, "boardId": boardId})
	})
	r.Run(":8080")
}

func Init(userName string, userPwd string, dbAddr string, dbName string) error {
	if err := repository.Init(userName, userPwd, dbAddr, dbName); err != nil {
		return err
	}
	return nil
}
