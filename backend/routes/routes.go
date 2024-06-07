package routes

import (
	"backend/controllers"
	"backend/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api") 
	{
		api.GET("/auth/message", controllers.GetMessage)
		api.POST("/auth/signin", controllers.SignIn)

		protected := api.Group("/")
		protected.Use(middlewares.AuthMiddleware()) // apply the middleware to the protected group
		{
			protected.GET("/protected", controllers.ProtectedEndpoint)
		}
	}
}
