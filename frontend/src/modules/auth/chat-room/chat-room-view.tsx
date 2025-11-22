import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, Upload, User, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const ChatGroupModal = ({
  open,
  onClose,
  selectedRoom,
  addPeople,
  setAddPeople,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [selectedChatRooms, setSelectedChatRooms] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Mock data for chat rooms
  const chatRooms = [
    {
      id: 1,
      roomid: "room1",
      name: "John Doe",
      channel_name: "John Doe",
      members: [{ avatar: "" }]
    },
    {
      id: 2,
      roomid: "room2", 
      name: "Sarah Wilson",
      channel_name: "Sarah Wilson",
      members: [{ avatar: "" }]
    },
    {
      id: 3,
      roomid: "room3",
      name: "Mike Johnson",
      channel_name: "Mike Johnson", 
      members: [{ avatar: "" }]
    },
    {
      id: 4,
      roomid: "room4",
      name: "Design Team",
      channel_name: "Design Team",
      members: [{ avatar: "" }]
    },
    {
      id: 5,
      roomid: "room5",
      name: "Marketing Group",
      channel_name: "Marketing Group",
      members: [{ avatar: "" }]
    }
  ];

  const handleClose = () => {
    setGroupName("");
    setSelectedChatRooms([]);
    setImagePreview(null);
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleChatRoomSelection = (roomId) => {
    setSelectedChatRooms(prev =>
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.channel_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="sm:max-w-xl w-full max-h-[90vh] mx-4 flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {addPeople ? "Add Members to Group" : "Create Chat Group"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isPending}
              className="hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-8 p-6 overflow-auto">
          {/* Group Name - Only show when creating new group */}
          {!addPeople && (
            <div className="flex-1">
              <label className="font-medium text-gray-700 mb-2 block">
                Group Name *
              </label>
              <Input
                placeholder="Enter a group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                disabled={isPending}
                className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary transition-all"
              />
            </div>
          )}

          {/* Picture Upload - Only show when creating new group */}
          {!addPeople && (
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Group Picture
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isPending}
                />

                <Card
                  className="w-full h-32 flex items-center justify-center cursor-pointer border-2 border-dashed hover:border-primary/60 bg-gray-50 hover:bg-gray-100 transition-all duration-200 rounded-xl"
                  onClick={triggerFileInput}
                >
                  <CardContent className="flex items-center justify-center h-full p-2">
                    {imagePreview ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={imagePreview}
                          alt="Group preview"
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <Upload className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mb-2 opacity-70" />
                        <span className="text-xs font-medium text-gray-500">
                          Upload Image
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    disabled={isPending}
                    className="w-full border-gray-300 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Chat Room Selection */}
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">
                  {addPeople
                    ? "Select Members to Add"
                    : "Select Chat Rooms (Optional)"}
                </label>
                {selectedChatRooms.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedChatRooms.length} selected
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm">
                {addPeople
                  ? "Choose chat rooms to add as members to this group."
                  : "Choose existing chat rooms to include in this group."}
              </p>

              {/* Search Input */}
              <Input
                placeholder="Search chat rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isPending || isLoading}
                className="rounded-lg border-gray-300 focus:ring-primary/40"
              />

              {/* Chat Rooms List */}
              <ScrollArea className="h-64 rounded-lg border border-gray-200 bg-white shadow-inner">
                <div className="p-4 space-y-3">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : filteredChatRooms.length > 0 ? (
                    filteredChatRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                        onClick={() => toggleChatRoomSelection(room.roomid)}
                      >
                        <Checkbox
                          checked={selectedChatRooms.includes(room.roomid)}
                          onCheckedChange={() => toggleChatRoomSelection(room.roomid)}
                          disabled={isPending}
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <Avatar className="h-8 w-8 bg-primary/10">
                            <AvatarImage src={room.members?.[0]?.avatar} />
                            <AvatarFallback className="text-xs bg-primary/20 text-primary font-medium">
                              {getInitials(room.name || room.channel_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {room.name || room.channel_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <User className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p>
                        {addPeople
                          ? "No available chat rooms to add"
                          : "No chat rooms found"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-primary hover:bg-primary/90"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {addPeople ? "Add Members" : "Create Group"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};