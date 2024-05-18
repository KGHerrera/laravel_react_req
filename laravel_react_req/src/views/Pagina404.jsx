import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Pagina404 = () => {
  return (
    <div className='flex items-center justify-center w-100 min-h-screen flex-col bg-gray-900'>

      <Typography className='text-9xl text-pink-500'>
        404
      </Typography>
      <Typography className='text-base text-gray-200'>
          <Link to='/requisiciones'>
            <span className='fa fa-frown-o'></span> Página no encontrada volver a inicio 
          </Link>
      </Typography>

    </div>
  )
}

export default Pagina404