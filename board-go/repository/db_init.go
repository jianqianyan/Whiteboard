package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init(dsn string) error {
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("连接数据库失败, error=" + err.Error())
	}
	if db.Migrator().HasTable(&Chirography{}) == false {
		db.Migrator().CreateTable(&Chirography{})
	}
	if db.Migrator().HasTable(&BrushTop{}) == false {
		db.Migrator().CreateTable(&BrushTop{})
	}
	if db.Migrator().HasTable(&Board{}) == false {
		db.Migrator().CreateTable(&Board{})
	}
	if db.Migrator().HasTable(&User{}) == false {
		db.Migrator().CreateTable(&User{})
	}
	return nil
}
