/**
 * Created by botuongda on 12/15/2016.
 */
function them_moi(key,vitri,dulieu) {
    var str=$(dulieu).val()
    var event = window.event || key
    var i=key.keyCode
    if(i===13 && str.trim() !== '')
    {
        themdong(vitri,str)
        $(dulieu).val("")
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
    }
    })
    console.log(n)
}


$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});