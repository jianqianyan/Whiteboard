package service

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func ReleasePost(body dao.Body) error {
	return NewReleasePost(body).AddChirography()
}
func NewReleasePost(body dao.Body) *repository.Chirography {
	body.Data.CreatedTime = body.Time
	return &body.Data
}
