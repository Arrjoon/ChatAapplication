"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Youtube,
  Folder,
  Upload,
  Plus,
  Search,
  X,
} from "lucide-react";

interface MediaItem {
  id: number;
  name: string;
  type: "image" | "video" | "pdf" | "youtube";
  url: string;
  folder?: string;
}

interface MediaManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MediaManager({ open, onOpenChange }: MediaManagerProps) {
  const [activeTab, setActiveTab] = useState<"images" | "videos" | "pdfs" | "youtube">("images");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState<string[]>(["All", "News", "Articles", "Featured"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Mock data
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { id: 1, name: "news-image-1.jpg", type: "image", url: "/placeholder.jpg", folder: "News" },
    { id: 2, name: "article-image.pdf", type: "pdf", url: "/document.pdf", folder: "Articles" },
    { id: 3, name: "breaking-news.mp4", type: "video", url: "/video.mp4", folder: "News" },
  ]);

  const filteredMedia = mediaItems.filter((item) => {
    const matchesTab = 
      (activeTab === "images" && item.type === "image") ||
      (activeTab === "videos" && item.type === "video") ||
      (activeTab === "pdfs" && item.type === "pdf") ||
      (activeTab === "youtube" && item.type === "youtube");
    
    const matchesFolder = !selectedFolder || selectedFolder === "All" || item.folder === selectedFolder;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesFolder && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log("Files selected:", files);
    }
  };

  const handleAddYouTube = () => {
    if (youtubeUrl.trim()) {
      console.log("YouTube URL:", youtubeUrl);
      setYoutubeUrl("");
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName && !folders.includes(folderName)) {
      setFolders([...folders, folderName]);
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] w-[80vw] h-[95vh] max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 translate-x-[-50%]! translate-y-[-50%]!">
        <DialogHeader className="px-8 py-5 border-b bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">Media Manager</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex bg-white">
          {/* Sidebar - Folders */}
          <div className="w-64 border-r bg-gray-50 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">Folders</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateFolder}
                className="h-7 w-7 p-0 border-gray-300 hover:bg-gray-100"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder === "All" ? null : folder)}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-all ${
                    (!selectedFolder && folder === "All") || selectedFolder === folder
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">{folder}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Tabs */}
            <div className="bg-white border-b px-6">
              <div className="flex gap-0.5">
                {[
                  { id: "images", label: "Images", icon: ImageIcon },
                  { id: "videos", label: "Videos", icon: Video },
                  { id: "pdfs", label: "PDFs", icon: FileText },
                  { id: "youtube", label: "YouTube", icon: Youtube },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-5 py-3.5 font-medium text-sm transition-all border-b-2 relative ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600 bg-blue-50/50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                {activeTab === "youtube" ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste YouTube URL here"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-72 h-10 text-sm border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                    <Button 
                      onClick={handleAddYouTube} 
                      className="bg-red-600 hover:bg-red-700 h-10 px-5 text-sm"
                    >
                      Add YouTube
                    </Button>
                  </div>
                ) : (
                  <label>
                    <input
                      type="file"
                      multiple
                      accept={
                        activeTab === "images"
                          ? "image/*"
                          : activeTab === "videos"
                          ? "video/*"
                          : activeTab === "pdfs"
                          ? "application/pdf"
                          : ""
                      }
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700 h-10 px-5 text-sm shadow-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {activeTab === "images" ? "Images" : activeTab === "videos" ? "Videos" : "PDFs"}
                    </Button>
                  </label>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {activeTab === "youtube" ? (
                <div>
                  {filteredMedia.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
                      <div className="bg-gray-100 rounded-full p-6 mb-4">
                        <Youtube className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium text-gray-600 mb-1">No YouTube videos yet</p>
                      <p className="text-sm text-gray-500">Add your first YouTube video using the input above</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-5">
                      {filteredMedia.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border-gray-200">
                          <CardContent className="p-0">
                            {item.type === "youtube" && item.url && (
                              <div className="aspect-video bg-gray-900">
                                <iframe
                                  src={getYoutubeEmbedUrl(item.url) || item.url}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            )}
                            <div className="p-4 bg-white">
                              <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {filteredMedia.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
                      <div className="bg-gray-100 rounded-full p-6 mb-4">
                        {activeTab === "images" && <ImageIcon className="h-12 w-12 text-gray-400" />}
                        {activeTab === "videos" && <Video className="h-12 w-12 text-gray-400" />}
                        {activeTab === "pdfs" && <FileText className="h-12 w-12 text-gray-400" />}
                      </div>
                      <p className="text-lg font-medium text-gray-600 mb-1">No {activeTab} found</p>
                      <p className="text-sm text-gray-500 mb-4">Upload your first {activeTab.slice(0, -1)} to get started</p>
                      <label>
                        <input
                          type="file"
                          multiple
                          accept={
                            activeTab === "images"
                              ? "image/*"
                              : activeTab === "videos"
                              ? "video/*"
                              : activeTab === "pdfs"
                              ? "application/pdf"
                              : ""
                          }
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload {activeTab === "images" ? "Images" : activeTab === "videos" ? "Videos" : "PDFs"}
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div className="grid grid-cols-6 gap-4">
                      {filteredMedia.map((item) => (
                        <Card
                          key={item.id}
                          className="cursor-pointer hover:shadow-xl transition-all group overflow-hidden border-gray-200 bg-white"
                        >
                          <CardContent className="p-0">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                              {item.type === "image" && (
                                <ImageIcon className="h-12 w-12 text-gray-400 group-hover:scale-110 transition-transform" />
                              )}
                              {item.type === "video" && (
                                <Video className="h-12 w-12 text-gray-400 group-hover:scale-110 transition-transform" />
                              )}
                              {item.type === "pdf" && (
                                <FileText className="h-12 w-12 text-gray-400 group-hover:scale-110 transition-transform" />
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <Button
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 hover:bg-gray-50 shadow-md border border-gray-200"
                                >
                                  Select
                                </Button>
                              </div>
                            </div>
                            <div className="p-3 bg-white">
                              <p className="font-medium text-xs text-gray-900 truncate">{item.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
