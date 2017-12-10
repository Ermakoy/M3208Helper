from django.urls import path


from storage.api.views import (
    RootFolderAPIView,
    FolderAPIView,

)
urlpatterns = [
    # url(r'^api/', include('storage.api.urls')),
    path('root/', RootFolderAPIView.as_view()),
    path('folder/<int:pk>/', FolderAPIView.as_view()),
    path('folder/create/', FolderAPIView.as_view()),
    # path('folder/delete/<int:pk>/', FolderAPIView.as_view()),
    path('folder/update/<int:pk>/', FolderAPIView.as_view()),
]