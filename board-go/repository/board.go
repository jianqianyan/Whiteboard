package repository

import "errors"

type Board struct {
	BoardId string `gorm:"primaryKey"`
	UserId  string
}

func CreateBoard(eg *Board) (error, Status) {
	resultCreate := db.Create(eg)
	if resultCreate.Error != nil {
		return errors.New("数据库添加失败"), 502
	}
	return nil, 200
}
