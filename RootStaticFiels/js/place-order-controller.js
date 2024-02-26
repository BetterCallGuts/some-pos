    /*
    *   ================================= GLOBAL VARIABLES ============================================================
    * */
    var tblOrder = null;
    var selectedRow = null;
    var bin         = $(".bin")

    /*
    *   ================================= document.ready() /  window.load() ============================================================
    * */
    $(function () {
        initializeDataTable();

        initializeTextFields();
    });

    /*
    *   ================================= EVENT HANDLERS ============================================================
    * */
    $("#btn-save").click(addItemToOrder);
    $("#tbl-orders tbody").on("click", "tr", selectOrder);
    $("#tbl-orders tbody").on("click", "td:last-child", function (){
        $(this).closest("tr").remove()
    });
    $("#btn-clear").click(deselectAllOrders);

    $("#btn-placeorder").click(placeOrder);
    $("#cmb-custId option").click(loadCustomerName);
    $("#cmb-code option").click(loadItemDescription());

    /*
    *   ================================= FUNCTIONS ============================================================
    * */
    function initializeDataTable(callbackFn) {
        if (tblOrder != null) {
            tblOrder.destroy();
        }

        if (callbackFn != undefined) {
            callbackFn();
            if ($("#tbl-orders tbody tr").length > 0) {
                $("#tbl-orders tfoot").addClass("d-none");
            } else {
                $("#tbl-orders tfoot").removeClass("d-none");
            }
        }

        tblOrder = $("#tbl-orders").DataTable({
            "ordering": false,
            "lengthChange": false,
            "pageLength": 5,
            "responsive": true,
            "autoWidth": false,
            "info": false,
        });

        //to remove built in empty message in data table
        $("#tbl-orders tr .dataTables_empty").remove();
    }

    function selectOrder() {
        deselectAllOrders();
        $(this).addClass("selected-row");
        selectedRow = $(this);
        // 
        $("#zbon").val(selectedRow.find("td:first-child").text());
        $("#cmb-code").val(selectedRow.find("td:nth-child(2)").text());
        $("#txt-qtyOnHand").val(selectedRow.find("td:nth-child(3)").text());
        $("#txt-price").val(selectedRow.find("td:nth-child(4)").text());

    }


    function addItemToOrder() {
        var zbon    = $("#zbon").val();
        var product = $("#cmb-code").val();
        var howMany = $("#txt-qtyOnHand").val();
        var t5fed   = $("#txt-price").val();
        if (product){

            var price       = document.getElementById(`${product}`).value; 
        }else{
            var price       = 1
        }


        
        var newRow = "<tr class='itemstosubmit'>\n" +
            " <td id='td-zbon'>" + zbon + "</td>\n" +
            " <td id='td-prod'>" + product + "</td>\n" +
            " <td id='td-howM'>" + howMany + "</td>\n" +
            " <td id='td-t5fe'>" + t5fed + "</td>\n" +
            " <td id='td-total'>" + (price *howMany - t5fed)+"EGP"+ "</td>\n" +
            " <td class='bin'><i class=\"fas fa-trash\"></i></td>\n" +
            "</tr>";

            $('#tbl-orders tbody').append(newRow);
            $("#btn-clear").click();
        
            $("#zbon").val(zbon)
        delete zbon, product, howMany, t5fed
    }




    function placeOrder() {
        let items     = document.getElementsByClassName("itemstosubmit");
        let submitted = [];
        for (let i of items) {

            let obj = {
                "zbon" : i.querySelector('#td-zbon').innerHTML,
                "prod" : i.querySelector('#td-prod').innerHTML,
                "howm" : i.querySelector('#td-howM').innerHTML,
                "t5fe" : i.querySelector('#td-t5fe').innerHTML,

            }
            submitted.push(obj)

        }
        console.log(document.querySelector('[name=csrfmiddlewaretoken]').value)
        $.post("/add_pos_cart/",
        {
            'csrfmiddlewaretoken' : document.querySelector('[name=csrfmiddlewaretoken]').value,
            "data" : JSON.stringify(submitted),
        }),
        function(data, status){
            console.log(status)
        }
        
        deleteAllOrders()
        
    }





    function deleteAllOrders() {
        $("#tbl-orders tbody tr").remove();
        $("#tbl-orders tfoot").removeClass("d-none");
    }


    function initializeTextFields() {
        var date = new Date();
        $("#txt-date").text(date);
    }




    function deselectAllOrders() {
        $("#tbl-orders tbody tr").removeClass("selected-row");
        $("#btn-save").text("Save");
        selectedRow = null;
    }