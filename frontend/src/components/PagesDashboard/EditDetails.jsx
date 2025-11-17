import React from 'react'

const EditDetails = () => {
  return (
    <div className='flex justify-center items-center w-screen'>
        {/* Edit Details Box */}
        <div className='bg-neutral-200 flex flex-col rounded-md p-10 text-black'>
            <h1 className='flex justify-center font-bold text-3xl'>Update Details</h1>
            <form className='flex flex-col font-semibold space-y-3 mt-10'>

                <div className='flex space-x-2.5'>
                  <a>New First Name: </a>
                  <input required className='border-b border-black w-xs outline-0 transition-all duration-200 
                                            focus:border-b-red-700'></input>
                </div>
                
                <div className='flex space-x-2.5'>
                  <a>New First Name: </a>
                  <input required className='border-b border-black w-xs outline-0 transition-all duration-200 
                                            focus:border-b-red-700'></input>
                </div>

                <div className='flex space-x-2.5'>
                  <a>New First Name: </a>
                  <input required className='border-b border-black w-xs outline-0 transition-all duration-200 
                                            focus:border-b-red-700'></input>
                </div>

                <button className='mt-5 bg-amber-300 text-black rounded-md p-1.5 hover:opacity-80 hover:cursor-pointer active:opacity-60'>Change Password</button>
            </form>

        </div>

    </div>
  )
}

export default EditDetails