/**
 * Created by botuongda on 12/15/2016.
 */
var colum=["todo","doing","done"];

// Phần lưu dữ liệu
var dulieu = {
    getData: function () {
        if (typeof(Storage) !== "undefined") {
            var data;
            try {
                data = JSON.parse(localStorage.getItem('list')) || {}
            }
            catch(error){
                data={}

            }
            return data;

        } else {
            alert("Sorry! No Web Storage support..");
            return {};
        }
    },

    luuData: function (data) {
        localStorage.setItem('list', JSON.stringify(data));
    }
}


var list= dulieu.getData();
// Phần lưu dữ liệu


function themdong(vitri,str) {
    var item=' <li class="collection-item dismissable"><div>' +
        str +
        '<a href="#!" class="secondary-content"><i class="fa fa-trash fa-lg" aria-hidden="true" onclick="xoa(this)"></i></a></div></li>'

    $("#"+vitri).append(item)

}
function them_moi(key,vitri,input) {
    var str=$(input).val();
    var event = window.event || key;
    var i=key.keyCode;
    if(i===13 && str.trim() !== '')
    {
        themdong(vitri,str);
        $(input).val("");
        dem();
        // lưu dữ liệu
        if (!list[vitri]){list[vitri]=[]}
        list[vitri].push(str); //gán giá trị vào mảng list
        // console.log(list);

        console.log(dulieu.getData());
        dulieu.luuData(list); //lưu dữ liệu vào local

    }


}


var btn = $( "button:first" )

function xoa(n) {
    btn.off('click');   // sử dụng off('click') để tránh bị lặp event
    var item;
    var iValild=false;
    $('#modal1').modal('open')
    btn.on('click' , function() {
        iVaild=true;

    if(iVaild==true){
    item=$(n).parent()
    item=$(item).parent()
    item=$(item).parent()
        var vitri = item.parent().attr('id');
        console.log(vitri);
        list[vitri].splice(item.index(),1)
        dulieu.luuData(list); //lưu dữ liệu vào local
    item.remove()
    dem()
    }
    })

}


function dem() {
    $($("h5")[0]).text('TODO : ' + $("#todo li").length )
    $($("h5")[1]).text('DOING : ' + $("#doing li").length )
    $($("h5")[2]).text('DONE : ' + $("#done li").length )

}


    





$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

});


$( function() {

    //them công việc đang làm dở
    colum.forEach(function(cot){       //lặp lại từng lần theo các ký tự trong mảng var colum=["todo","doing","done"]
        var n = list[cot] || [];      //gán giá trị n cho giá trị đã được nhập vào của từng cột
        n.forEach(function(str){      //lặp lại giá trị của từng mảng trong str - từng giá trị đã được nhập vào
            themdong(cot, str);         // dùng hàm thêm dòng vào từng cột
        });
    })

    dem()                               //hiện thị số lượng dòng và cột ngay sau khi hiển thị lại

    $( ".sapxep" ).sortable({
        connectWith: ".sapxep"
//                placeholder: "ui-state-highlight"
    })
} );
$(document).ready(function() {
    Materialize.updateTextFields();
});