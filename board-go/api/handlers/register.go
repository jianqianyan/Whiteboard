package handlers

import (
	"github.com/cloudwego/kitex-examples/bizdemo/easy_note/pkg/errno"
	"github.com/gin-gonic/gin"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func Register(c *gin.Context) {
	var registerVar UserParam
	if err := c.Bind(&registerVar); err != nil {
		SendResponse(c, errno.ConvertErr(err), nil)
		return
	}
	if len(registerVar.Phone) == 0 || len(registerVar.PassWord) == 0 {
		SendResponse(c, errno.ParamErr, nil)
		return
	}
	if repository.CheckUser(&repository.User{Phone: registerVar.Phone, Password: registerVar.PassWord}) {
		SendResponse(c, errno.UserAlreadyExistErr, nil)
		return
	}
	err := repository.CreateUser(&repository.User{
		Phone:    registerVar.Phone,
		Password: registerVar.PassWord,
	})
	if err.ErrCode != 0 {
		SendResponse(c, err, nil)
		return
	}
	SendResponse(c, errno.Success, nil)
}
