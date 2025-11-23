import { useState, useRef } from "react";
import { X, Loader2, Upload, User, Image as ImageIcon } from "lucide-react";

export const ChatGroupModal = ({ open, onClose, addPeople }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [selectedChatRooms, setSelectedChatRooms] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const chatRooms = [
        { id: 1, roomid: "room1", name: "John Doe", channel_name: "John Doe", members: [{ avatar: "" }] },
        { id: 2, roomid: "room2", name: "Sarah Wilson", channel_name: "Sarah Wilson", members: [{ avatar: "" }] },
        { id: 3, roomid: "room3", name: "Mike Johnson", channel_name: "Mike Johnson", members: [{ avatar: "" }] },
        { id: 4, roomid: "room4", name: "Design Team", channel_name: "Design Team", members: [{ avatar: "" }] },
        { id: 5, roomid: "room5", name: "Marketing Group", channel_name: "Marketing Group", members: [{ avatar: "" }] },
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
        reader.onload = (e) => setImagePreview(e.target?.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };

    const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const getInitials = (name) => {
      return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const toggleChatRoomSelection = (roomId) => {
      setSelectedChatRooms((prev) =>
        prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
      );
    };

    const filteredChatRooms = chatRooms.filter(
      (room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.channel_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="sm:max-w-xl w-full max-h-[90vh] mx-4 flex flex-col bg-white rounded-2xl shadow-xl border border-gray-200">

          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {addPeople ? "Add Members to Group" : "Create Chat Group"}
            </h2>
            <button
              onClick={handleClose}
              disabled={isPending}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col gap-6 p-6 overflow-auto">

            {/* Group Name */}
            {!addPeople && (
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Group Name *</label>
                <input
                  type="text"
                  placeholder="Enter a group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {/* Group Picture */}
            {!addPeople && (
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Group Picture</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isPending}
                />
                <div
                  onClick={triggerFileInput}
                  className="w-full h-32 flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 bg-gray-50"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="h-8 w-8 mb-1" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  )}
                </div>
                {imagePreview && (
                  <button
                    onClick={removeImage}
                    className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-md hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-1"
                    disabled={isPending}
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                )}
              </div>
            )}

            {/* Chat Room Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">
                  {addPeople ? "Select Members to Add" : "Select Chat Rooms (Optional)"}
                </label>
                {selectedChatRooms.length > 0 && (
                  <span className="text-sm text-gray-500">{selectedChatRooms.length} selected</span>
                )}
              </div>

              <p className="text-gray-500 text-sm">
                {addPeople
                  ? "Choose chat rooms to add as members to this group."
                  : "Choose existing chat rooms to include in this group."}
              </p>

              <input
                type="text"
                placeholder="Search chat rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isPending || isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="h-64 overflow-auto border rounded-lg border-gray-200 bg-white mt-2">
                <div className="p-2 space-y-2">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    </div>
                  ) : filteredChatRooms.length > 0 ? (
                    filteredChatRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleChatRoomSelection(room.roomid)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedChatRooms.includes(room.roomid)}
                          onChange={() => toggleChatRoomSelection(room.roomid)}
                          disabled={isPending}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {getInitials(room.name || room.channel_name)}
                          </div>
                          <p className="text-sm font-medium text-gray-800 truncate">{room.name || room.channel_name}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <User className="h-8 w-8 mx-auto mb-1" />
                      <p>{addPeople ? "No available chat rooms to add" : "No chat rooms found"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {addPeople ? "Add Members" : "Create Group"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
