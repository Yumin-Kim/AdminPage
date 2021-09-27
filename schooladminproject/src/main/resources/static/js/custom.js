(function($){
console.log("custom")
//회원 정보 삭제
$("#updateButton").on("click",()=>{
console.log("Hello")

   $.ajax({
           url: 'http://localhost:8080/member/1',
           type: 'DELETE',
           data: "json"
       }).then((data, textStatus, jqXHR) => {
           console.log(data);
       }, (jqXHR, textStatus, errorThrown) => {
           /*pass*/
       })
})

//회원 정보 수정


})