package service

import (
	"errors"

	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func ReleaseCreate(body dao.Body) error {
	eg := newChirographyFlow(body)
	if err := checkParm(eg); err != nil {
		return err
	}
	if err := repository.CreateChirography(eg); err != nil {
		return err
	}
	return nil
}
func newChirographyFlow(body dao.Body) *repository.Chirography {
	body.Data.CreatedTime = body.Time
	return &body.Data
}
func checkParm(f *repository.Chirography) error {
	if f.BrushId == "" {
		return errors.New("BrushId不能为空! ")
	}
	if f.CreatedTime.IsZero() {
		return errors.New("CreatedTime不能为空! ")
	}
	return nil
}
