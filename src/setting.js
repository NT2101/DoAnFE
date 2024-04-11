
const BASE_URL = "'https://localhost:7109/api'";
const URL_API = {
  LOGIN: "/login",

  GET_STUDENT_BY_ID: "/students",
  GET_ALL_STUDENT: "/students/All",
  CREATE_STUDENT: "/students/Create",
  DELETE_STUDENT_BY_ID: "/students/Delete",
  UPDATE_STUDENT_BY_ID: "/students/Update",

  GET_ALL_TEACHER: "/teachers/All",
  GET_TEACHER_BY_ID: "/teachers",
  CREATE_TEACHER: "/teachers/Create",
  DELETE_TEACHER_BY_ID: "/teachers/Delete",
  UPDATE_TEACHER_BY_ID: "/teachers/Update",

  GET_ALL_TOPIC: "/topics/All",
  GET_TOPICL_BY_ID: "/topics",
  CREATE_TOPIC: "/topics/Create",
  DELETE_TOPIC_BY_ID: "/topics/Delete",
  UPDATE_TOPIC_BY_ID: "/topics/Update",

  GET_ALL_TOPICTYPE: "/topictypes/All",
  GET_TOPICTYPE_BY_ID: "/topictypes",
  CREATE_TOPICTYPE: "/topictypes/Create",
  DELETE_TOPICTYPE_BY_ID: "/topictypes/Delete",
  UPDATE_TOPICTYPE_BY_ID: "/topictypes/Update",

  GET_ALL_ACCOUNT: "/accounts/all",
  GET_ACCOUNT_BY_ID: "/accounts",
  CREATE_ACCOUNT: "/accounts/create",
  DELETE_ACCOUNT_BY_ID: "/accounts/delete",
  UPDATE_ACCOUNT_BY_ID: "/accounts/update",


};

const ACTION = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
  OPEN: true,
  CLOSE: false,
};



const GENDER_STATUS = {
  0: { code: "0", name: "Nam" },
  1: { code: "1", name: "Nữ" },
};


const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};



const setting = Object.freeze({
  BASE_URL,
  URL_API,
  ACTION,
  STATUS_CODE,
  GENDER_STATUS,

});

export default setting;
