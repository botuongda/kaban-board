/**
 * Created by botuongda on 12/15/2016.
 */
function dem() {
    $($("h5")[0]).text('TODO : ' + $("#todo li").length )
    $($("h5")[1]).text('DOING : ' + $("#doing li").length )
    $($("h5")[2]).text('DONE : ' + $("#done li").length )
}
dem()
function them_moi(key,vitri,dulieu) {
    var str=$(dulieu).val()
    var event = window.event || key
    var i=key.keyCode
    if(i===13 && str.trim() !== '')
    {
        themdong(vitri,str)
        $(dulieu).val("")
        dem()
    }


}
function themdong(vitri,str) {
    var item=' <li class="collection-item dismissable"><div>' +
        str +
        '<a href="#!" class="secondary-content"><i class="fa fa-trash fa-lg" aria-hidden="true" onclick="xoa(this)"></i></a></div></li>'

        $("#"+vitri).append(item)

}
function xoa(n) {
    var item;
    var iValild=false;
    $('#modal1').modal('open')
    $( "button:first" ).click(function() {
        iVaild=true;

    if(iVaild==true){
    item=$(n).parent()
    item=$(item).parent()
    item=$(item).parent()
    item.remove()
    dem()
    }
    })
    console.log(n)
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