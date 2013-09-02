$.fn.datafields = (opts = {}) ->
    $this = $(this)

    init = () ->
        $($this).submit(()->
            row = make_datafield_row()
            console.log($($this).data('update_idx'))
            if $($this).data('update_idx')>-1
                $('table#participant_datafields tbody tr').eq($($this).data('update_idx')).replaceWith(row);
            else
                $('table#participant_datafields').append(row)
            $('#datafield-modal').modal('hide')
            return false
        )

        $('.remove-datafield').live('click',(e)->
            $(this).parents('tr').remove()
            $('input#pdatafields').val(to_json())
        )

        $('.edit-datafield').live('click',(e)->
            row = $(this).parents('tr')
            # set this to mark update and which row to update
            $('#datafield-form').data('update_idx', $('table#participant_datafields tbody tr').index(row))
            # set values of row to update
            $('#datafield-form').find('input#name').val($(row).data('name'))
            $('#datafield-form').find('input#title').val($(row).data('title'))
            $('#datafield-form').find('textarea#description').val($(row).data('description'))
            $('#datafield-form').find('select#fieldtype').val($(row).data('fieldtype'))
            if $(row).data('required') == true
                $('#datafield-form').find('input#required').attr('checked', true)

            $('#datafield-modal').modal('show')
        )

        $('#datafield-modal').on('hidden', ()->
            clear_form()
            $('input#pdatafields').val(to_json())
        )
        $('input#pdatafields').val(to_json())

    to_json = ()->
        obj = []
        $('table#participant_datafields tbody tr').each(()->
            obj.push(
                'name' : $(this).data('name')
                'title' : $(this).data('title')
                'description' : $(this).data('description')
                'fieldtype' : $(this).data('fieldtype')
                'required' : $(this).data('required')
            )
        )
        JSON.stringify(obj)

    clear_form = ()->
        # unset update idx
        #$($this).removeAttr('data-update_idx')
        $($this).data('update_idx', -1)
        # unset values
        $($this).find('input#name').val('')
        $($this).find('input#title').val('')
        $($this).find('textarea#description').val('')
        $($this).find('select#fieldtype').find(":selected").removeAttr("selected")
        $($this).find('input#required').attr('checked', false)

    make_datafield_row = ()->
        form = $('#datafield-form')
        name = $(form).find('input#name').val()
        title = $(form).find('input#title').val()
        description = $(form).find('textarea#description').val()
        fieldtype = $(form).find('select#fieldtype').find(":selected")
        required = $(form).find('input#required').attr('checked')
        r = $('<tr></tr>')
            .attr('data-name', name)
            .attr('data-title', title)
            .attr('data-description', description)
            .attr('data-fieldtype', fieldtype.val())
            .attr('data-required', required == 'checked')
        $('<td></td>').text(name).appendTo(r)
        $('<td></td>').text(title).appendTo(r)
        $('<td></td>').text(description).appendTo(r)
        $('<td></td>').text(fieldtype.text()).appendTo(r)
        if required == 'checked'
            $('<td></td>').html('<i class="icon-ok">').appendTo(r)
        else
            $('<td></td>').appendTo(r)
        $('<td><button class="btn btn-mini btn-info edit-datafield" type="button"><i class="icon-white icon-pencil"></button></td><td><button class="btn btn-mini btn-danger remove-datafield" type="button"><i class="icon-white icon-trash"></button></td>').appendTo(r)
        r

    $(this).each(init)
    this

$(document).ready( () ->
    $("#datafield-form").datafields()
)


