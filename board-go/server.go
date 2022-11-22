package main

import (
	"fmt"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
)

func main() {
	//go run ./board-go/server.go
	r := gin.Default()
	// r.GET("/upload", func(c *gin.Context) {
	// 	c.Redirect(http.StatusMovedPermanently, "https://www.baidu.com/")
	// 	// c.HTML(http.StatusOK, "fileUpload.html", nil)
	// })

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
	r.Run(":8080")
}
