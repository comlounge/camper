
$.fn.datafields = function(opts) {
  var $this, clear_form, init, make_datafield_row, to_json;
  if (opts == null) opts = {};
  $this = $(this);
  init = function() {
    $($this).submit(function() {
      var row;
      row = make_datafield_row();
      console.log($($this).data('update_idx'));
      if ($($this).data('update_idx') > -1) {
        $('table#participant_datafields tbody tr').eq($($this).data('update_idx')).replaceWith(row);
      } else {
        $('table#participant_datafields').append(row);
      }
      $('#datafield-modal').modal('hide');
      return false;
    });
    $('.remove-datafield').live('click', function(e) {
      $(this).parents('tr').remove();
      return $('input#pdatafields').val(to_json());
    });
    $('.edit-datafield').live('click', function(e) {
      var row;
      row = $(this).parents('tr');
      $('#datafield-form').data('update_idx', $('table#participant_datafields tbody tr').index(row));
      $('#datafield-form').find('input#name').val($(row).data('name'));
      $('#datafield-form').find('input#title').val($(row).data('title'));
      $('#datafield-form').find('textarea#description').val($(row).data('description'));
      $('#datafield-form').find('select#fieldtype').val($(row).data('fieldtype'));
      if ($(row).data('required') === true) {
        $('#datafield-form').find('input#required').attr('checked', true);
      }
      return $('#datafield-modal').modal('show');
    });
    $('#datafield-modal').on('hidden', function() {
      clear_form();
      return $('input#pdatafields').val(to_json());
    });
    return $('input#pdatafields').val(to_json());
  };
  to_json = function() {
    var obj;
    obj = [];
    $('table#participant_datafields tbody tr').each(function() {
      return obj.push({
        'name': $(this).data('name'),
        'title': $(this).data('title'),
        'description': $(this).data('description'),
        'fieldtype': $(this).data('fieldtype'),
        'required': $(this).data('required')
      });
    });
    return JSON.stringify(obj);
  };
  clear_form = function() {
    $($this).data('update_idx', -1);
    $($this).find('input#name').val('');
    $($this).find('input#title').val('');
    $($this).find('textarea#description').val('');
    $($this).find('select#fieldtype').find(":selected").removeAttr("selected");
    return $($this).find('input#required').attr('checked', false);
  };
  make_datafield_row = function() {
    var description, fieldtype, form, name, r, required, title;
    form = $('#datafield-form');
    name = $(form).find('input#name').val();
    title = $(form).find('input#title').val();
    description = $(form).find('textarea#description').val();
    fieldtype = $(form).find('select#fieldtype').find(":selected");
    required = $(form).find('input#required').attr('checked');
    r = $('<tr></tr>').attr('data-name', name).attr('data-title', title).attr('data-description', description).attr('data-fieldtype', fieldtype.val()).attr('data-required', required === 'checked');
    $('<td></td>').text(name).appendTo(r);
    $('<td></td>').text(title).appendTo(r);
    $('<td></td>').text(description).appendTo(r);
    $('<td></td>').text(fieldtype.text()).appendTo(r);
    if (required === 'checked') {
      $('<td></td>').html('<i class="icon-ok">').appendTo(r);
    } else {
      $('<td></td>').appendTo(r);
    }
    $('<td><button class="btn btn-mini btn-info edit-datafield" type="button"><i class="icon-white icon-pencil"></button></td><td><button class="btn btn-mini btn-danger remove-datafield" type="button"><i class="icon-white icon-trash"></button></td>').appendTo(r);
    return r;
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  return $("#datafield-form").datafields();
});
