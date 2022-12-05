package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleaseCreate(body dao.Body) error {
	return service.ReleaseCreate(body)
}
