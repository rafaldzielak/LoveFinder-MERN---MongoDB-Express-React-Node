import React, { Fragment } from 'react'

export const People = () => {
  return (
    <Fragment>
      <div class="upper-flex">
        <form action="#" id="delete-one-form">
          <input type="hidden" name="startid" value="" class="delete-one" />

          <input type="submit" value="Delete This User" class="btn-light alert-confirm"/>
        </form>



        

      </div>
    </Fragment>
  )
}
