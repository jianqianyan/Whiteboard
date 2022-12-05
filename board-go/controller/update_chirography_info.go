package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleaseUpdate(body dao.Body) error {
	return service.ReleaseUpdate(body)
}
