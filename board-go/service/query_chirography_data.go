package service

import (
	"errors"

	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func QueryBrushInfo(board_id string) (error, repository.Status, []*repository.Chirography) {
	return NewQueryBrushInfoFlow(board_id).Do()
}
func NewQueryBrushInfoFlow(bdId string) *QueryBrushInfoFlow {
	return &QueryBrushInfoFlow{boardId: bdId}
}

type QueryBrushInfoFlow struct {
	boardId   string
	brushInfo []*repository.Chirography
}

func (f *QueryBrushInfoFlow) Do() (error, repository.Status, []*repository.Chirography) {
	if err, status := f.check(); err != nil {
		return err, status, nil
	}
	if err, status := f.prepareInfo(); err != nil {
		return err, status, nil
	}
	return nil, 200, f.brushInfo
}

func (f *QueryBrushInfoFlow) check() (error, repository.Status) {
	if f.boardId == "" {
		return errors.New("boardId参数不能为空! "), 601
	}
	return nil, 200
}
func (f *QueryBrushInfoFlow) prepareInfo() (error, repository.Status) {
	var err error
	var status repository.Status
	err, status, f.brushInfo = repository.NewChirographyDaoInstance().QueryChirographyByBoardId(f.boardId)
	return err, status
}
