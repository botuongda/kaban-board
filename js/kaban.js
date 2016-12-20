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
        dem();
        var gioihan= $("#"+ vitri + " li").length //biến giới hạn số dòng cho list

        if (gioihan<4){
            themdong(vitri,str);
            $(input).val("");

            // lưu dữ liệu
            if (!list[vitri]){list[vitri]=[]}
            list[vitri].push(str); //gán giá trị vào mảng list

            console.log(dulieu.getData());
            dulieu.luuData(list); //lưu dữ liệu vào local
        }
        else {alert("bạn chỉ được nhập 4 dòng thôi")}


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
        connectWith: ".sapxep",
        placeholder: "highlight",
        start: function (event,ui){

            ui.item.vitricot_old = ui.item[0].parentElement.getAttribute('id'); // vị trí cột
            ui.item.vitritrongchuoi_old = ui.item.index()                   //vị trí của phần tử trong chuỗi --- gán thêm giá trị cho ui.item.
            console.log(ui.item.vitricot_old)
            //console.log(list[vitricot_old][vitritrongchuoi_old])


        },
        stop: function (envent,ui){
            var i=ui.item
            var vitricot_new = ui.item[0].parentElement.getAttribute('id');
            var vitritrongchuoi_new = ui.item.index();
            var vitricot_cu = i.vitricot_old;
            var vitritrongchuoi_cu= i.vitritrongchuoi_old;
            if (list['doing'].length < 3){

                console.log(list[vitricot_cu][vitritrongchuoi_cu]);
                //xóa vị trí cũ
                list[vitricot_cu].splice(vitritrongchuoi_cu,1);
                //console.log(list);
                //thêm vào vị trí mới
                list[vitricot_new].splice(vitritrongchuoi_new,0,i[0].innerText);
                //console.log(i[0].innerText) hiện text trong thẻ
                //console.log(i[0].innerHTML) hiện code trong thẻ
                //console.log(list);
                dem()
                dulieu.luuData(list)
            }
            else {alert("Doing job chỉ có 3 việc thôi")}

        }

    })
} );
$(document).ready(function() {
    Materialize.updateTextFields();
});