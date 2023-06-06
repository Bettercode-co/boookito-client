
import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from "next/router"




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {
  
 
  
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
         

     
        </>
      )}
    </Disclosure>
  )
}
