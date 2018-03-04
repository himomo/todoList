//定义用于管理任务的数组
var todoList = null;
var finishTodoList = [];
var unfinishedTesk = document.getElementById("unfinished-tesk");
var finishedTesk = document.getElementById("finished-tesk");
//初始化todoList
function init() {
//    从localStorage中获取todoList的值，返回的值是一个字符串
    var todoListTesk = localStorage.getItem("todoList");
    if ( todoListTesk ) {
        todoList = JSON.parse(todoListTesk);
        for ( var k = 0; k < todoList.length; k++ ) {
            created(unfinishedTesk, todoList[k], "×");
        }
    }
    else{
        todoList = [];
    }
}
//初始化finishTodoList
function inited() {
//    从localStorage中获取todoList的值，返回的值是一个字符串
    var finishTodoListTesk = localStorage.getItem("finishTodoList");
    if ( finishTodoList ) {
        finishTodoList = JSON.parse(finishTodoListTesk);
        for ( var g = 0; g < finishTodoList.length; g++ ) {
            created(finishedTesk, finishTodoList[g], "√");
        }
    }
    else{
        finishTodoList = [];
    }
}
//创建元素
function created(text, numText, sel) {
    const divText = document.createElement("div");
    divText.id = "text";
    text.appendChild(divText);
    const inputText = document.createElement("input");
    inputText.type = "checkBox";
    inputText.className = "inputText";
    divText.appendChild(inputText);
    const spanText = document.createElement("span");
    const spanTextList = document.createTextNode(numText);
    spanText.appendChild(spanTextList);
    divText.appendChild(spanText);
    const deleteText = document.createElement("div");
    deleteText.className = "delete";
    const a = document.createElement("a");
    a.href = "#";
    a.className = "deleteContext";
    const delteTextList = document.createTextNode(sel);
    a.appendChild(delteTextList);
    deleteText.appendChild(a);
    divText.appendChild(deleteText);
    finished();
    deleteTesks();

}
//界面加载完成后执行init()函数
init();
inited();

//添加任务
var addBtn = document.getElementById("addBtn");
addBtn.onclick = function () {
  const addTesk = document.getElementById("addTesk").value;
  todoList.push(addTesk);
  if ( addTesk !== null && addTesk !== "" ) {
      localStorage["todoList"] = JSON.stringify(todoList);
      // var todoListTesk = JSON.parse(localStorage["todoList"]);
      created(unfinishedTesk, addTesk, "×");
  }else {
      alert("请输入要添加的任务！");
  }
};
//当前任务是否完成
finished();
function finished() {
    var inputList = document.getElementsByClassName("inputText");
    for ( var t = 0; t < inputList.length; t++ ) {
        inputList[t].onclick = function () {
            const check = this.parentNode;
            const checkParent = check.parentNode;
            const checkedText = check.childNodes;
            const checkParentID = checkParent.id;
            checkParent.removeChild(check);
            const textLists = checkedText[1].innerHTML;
            if ( checkParentID === "unfinished-tesk" ) {
                if ( this.checked === true ) {
                    finishTodoList.push(textLists);
                    localStorage["finishTodoList"] = JSON.stringify(finishTodoList);
                    var todoListTesk = localStorage.getItem("todoList");
                    todoList = JSON.parse(todoListTesk);
                    for ( var f = 0; f < todoList.length; f++ ) {
                        if ( todoList[f] === textLists ) {
                            todoList.splice(f, 1);
                            localStorage["todoList"] = JSON.stringify(todoList);
                            created(finishedTesk, textLists, "√");
                        }
                    }
                }
            }else if ( checkParentID === "finished-tesk" ) {
                if ( this.checked === true ) {
                    todoList.push(textLists);
                    localStorage["todoList"] = JSON.stringify(todoList);
                    var finishTodoListTesk = localStorage.getItem("finishTodoList");
                    todoList = JSON.parse(finishTodoListTesk);
                    for ( var k = 0; k < finishTodoList.length; k++ ) {
                        if ( finishTodoList[k] === textLists ) {
                            finishTodoList.splice(k, 1);
                            localStorage["finishTodoList"] = JSON.stringify(finishTodoList);
                            created(unfinishedTesk, textLists, "×");
                        }
                    }
                }
            }
        }
    }
}



//删除当前任务
deleteTesks();
function deleteTesks() {
    const deleteTesked = document.getElementsByClassName("deleteContext");

    for ( var r = 0; r < deleteTesked.length; r++ ) {
        deleteTesked[r].onclick = function () {
            const checkedParent = this.parentNode;
            const checkedParents = checkedParent.parentNode;
            const checkedParentsParent = checkedParents.parentNode;
            const deleteText = checkedParents.childNodes[1].innerHTML;
            const parentID = checkedParentsParent.id;
            checkedParentsParent.removeChild(checkedParents);
            if ( parentID === "unfinished-tesk" ) {
                var todoListTesk = localStorage.getItem("todoList");
                todoList = JSON.parse(todoListTesk);
                for ( var f = 0; f < todoList.length; f++ ) {
                    if ( todoList[f] === deleteText ) {
                        todoList.splice(f, 1);
                        localStorage["todoList"] = JSON.stringify(todoList);
                    }
                }
            }else if ( parentID === "finished-tesk" ) {
                var finishTodoListTesk = localStorage.getItem("finishTodoList");
                finishTodoList = JSON.parse(finishTodoListTesk);
                for ( var h = 0; h < finishTodoList.length; h++ ) {
                    if ( finishTodoList[h] === deleteText ) {
                        finishTodoList.splice(h, 1);
                        localStorage["finishTodoList"] = JSON.stringify(finishTodoList);
                    }
                }
            }
        }
    }
}


//查询任务,查询的内容只包括未完成的任务
var searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = function () {
    const searchQuery = document.getElementById("search-query").value;
    const todoListTesk = localStorage.getItem("todoList");
    todoList = JSON.parse(todoListTesk);
    for ( var j = 0; j < todoList.length; j ++ ) {
        if ( todoList[j] !== searchQuery ) {
          alert("所查任务不存在！");
        }else{
            alert("所查任务还未完成！");
        }
    }
}
