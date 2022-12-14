package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

type BrushDate struct {
	Code    int64       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func QueryBrushInfo(board_id string) *BrushDate {
	var message = ""
	err, code, data := service.QueryBrushInfo(board_id)
	if err != nil {
		message = err.Error()
	}
	return &BrushDate{
		Code:    int64(code),
		Message: message,
		Data:    data,
	}
}
