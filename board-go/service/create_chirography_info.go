package service

import (
	"errors"

	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func ReleaseCreate(body dao.Body) (error, repository.Status) {
	eg := newChirographyFlow(body)
	if err, status := checkParm(eg); err != nil {
		return err, status
	}
	if err, status := repository.CreateChirography(eg); err != nil {
		return err, status
	}
	return nil, 200
}
func newChirographyFlow(body dao.Body) *repository.Chirography {
	body.Data.CreatedTime = body.Time
	return &body.Data
}
func checkParm(f *repository.Chirography) (error, repository.Status) {
	if f.BrushId == "" {
		return errors.New("brushId不能为空! "), 401
	}
	if f.CreatedTime.IsZero() {
		return errors.New("time不能为空! "), 401
	}
	return nil, 200
}
