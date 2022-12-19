package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

type BrushDate struct {
	Status  int64       `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func QueryBrushInfo(board_id string) *BrushDate {
	var message = ""
	err, status, data := service.QueryBrushInfo(board_id)
	if err != nil {
		message = err.Error()
	}
	return &BrushDate{
		Status:  int64(status),
		Message: message,
		Data:    data,
	}
}
