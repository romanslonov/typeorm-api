import {UserController} from "./controller/UserController";
import {RoomController} from "./controller/RoomController";
import {MessageController} from "./controller/MessageController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/rooms/",
    controller: RoomController,
    action: "save"
}, {
    method: "get",
    route: "/rooms/:id",
    controller: RoomController,
    action: "one"
}, {
    method: "get",
    route: "/rooms/",
    controller: RoomController,
    action: "all"
}, {
    method: "put",
    route: "/rooms/:id",
    controller: RoomController,
    action: "join"
}, {
    method: "get",
    route: "/rooms/:id/messages/",
    controller: RoomController,
    action: "messages"
}, {
    method: "post",
    route: "/messages/",
    controller: MessageController,
    action: "save"
}, {
    method: "get",
    route: "/messages/",
    controller: MessageController,
    action: "all"
}];