package handlers

import (
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	"github.com/cloudwego/kitex-examples/bizdemo/easy_note/pkg/errno"
	"github.com/gin-gonic/gin"
)

type Response struct {
	Status  int64       `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// SendResponse pack response
func SendResponse(c *gin.Context, err error, data interface{}) {
	Err := errno.ConvertErr(err)
	if Err.ErrCode == 0 {
		Err.ErrCode = 200
	}
	c.JSON(consts.StatusOK, Response{
		Status:  Err.ErrCode,
		Message: Err.ErrMsg,
		Data:    data,
	})
}

type UserParam struct {
	Phone    string `form:"Phone" json:"phone"`
	PassWord string `form:"password" json:"password"`
}
