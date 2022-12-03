package main

import (
	"fmt"
	"log"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/jianqianyan/Whiteboard/board-go/controller"
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

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
	r.POST("/updata", func(c *gin.Context) {
		var body dao.Body
		if err := c.ShouldBind(&body); err != nil {
			if controller.ReleasePost(body) != nil {
				c.JSON(-1, gin.H{
					"msg": "请求失败！ ",
				})
				fmt.Println(err)
			} else {
				c.JSON(200, gin.H{
					"msg": "请求成功！ ",
				})
			}
		} else {
			log.Fatal(err)
		}
	})
	r.Run(":8080")
}

func Init(userName string, userPwd string, dbAddr string, dbName string) error {
	if err := repository.Init("ywg", "ywg123456", "120.26.83.87:3306", "try"); err != nil {
		return err
	}
	return nil
}
