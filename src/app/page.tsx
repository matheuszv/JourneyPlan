'use client'
import { MapPin, Settings2, UserRoundPlus, ArrowRight, User, Mail, KeyIcon } from 'lucide-react';
import Image from "next/image";
import { FormEvent, useState } from 'react';
import icon from '../../public/globe.svg';
import { DatePickerWithRange } from '../components/ui/rangedatepicker';
import { DateRange } from 'react-day-picker';
import { ModalScreenInvite } from '@/components/modalScreenInvite';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';



export default function Home() {

  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [modalScreen, setModalScreen] = useState(false)

  //First Inputs
  const [range, setRange] = useState<DateRange | undefined>()
  const [local, setLocal] = useState<string>('')

  //Second Inputs
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  //Third Input
  const [ownerEmail, setOwnerEmail] = useState<string>('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [ownerPassword, setOwnerPassword] = useState<string>('')

  async function createNewTrip(event: FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    if(local==''){
      return
    }

    if(!range?.from || !range?.to){
      return
    }

    if(emailsToInvite.length===0){
      return
    }

    if(!ownerName || !ownerEmail){
      return
    }


    const response = await fetch('/api/createtrip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            local,
            starts_at: range.from,
            ends_at: range.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
            emailsToInvite: emailsToInvite,
            password: ownerPassword
        })
    });
  
    if (response.ok) {
        const data = await response.json();
        redirect(`/trips/${data.result.id}`)
       
    } else {
        console.error('Erro na requisição:', response.statusText);
    }
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newEmail = data.get('email')?.toString()
      if(!newEmail){
        return
      }

      if(emailsToInvite.includes(newEmail)){
        event.currentTarget.reset()
        return
      }

    setEmailsToInvite([...emailsToInvite, newEmail])
    event.currentTarget.reset()
  }


  function removeEmailToInvite(emailToRemove: string){
    const newList = emailsToInvite.filter(email => email != emailToRemove)
    setEmailsToInvite(newList)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 bg-plano bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Image src={icon} alt="Logo Planner" />
            <span className='text-zinc-500'>JOURNEY PLAN</span>
          </div>
          <p className="text-zinc-300 text-lg">Invite your friends and plan your next trip!</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3 w-full max-md:flex-col max-md:h-full max-md:py-6 max-md:gap-4">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} disabled={planConfirmed} placeholder="Where are you going?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-white max-md:border-b border-zinc-700"/>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerWithRange date={range} setDate={setRange} disabled={planConfirmed}/>
            </div>

            <div className="w-px h-6 bg-zinc-800 max-md:hidden" />
            
            {planConfirmed ? 
              (
              <button className="bg-zinc-800 rounded-lg px-3 py-2 flex items-center gap-1 hover:bg-zinc-700 cursor-pointer max-md:w-[240px] max-md:justify-center"
                onClick={()=>setPlanConfirmed(false)}>
                Change local/date <Settings2/>
              </button>) : (
              <button 
                className="bg-lime-300 text-lime-950 rounded-lg px-3 py-2 font-medium flex items-center gap-1 cursor-pointer hover:bg-yellow-400 disabled:bg-lime-200 disabled:text-lime-500 disabled:cursor-not-allowed max-md:w-[240px] max-md:justify-center"
                disabled={!range || local==''}
                onClick={()=>setPlanConfirmed(true)}  
              >
                Continue <ArrowRight/>
              </button>)
            }
          </div>
          { planConfirmed && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 w-full">
                <button type="button" className="flex items-center gap-2 flex-1" onClick={() => setModalScreen(true)}>
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  { emailsToInvite.length > 0 ?
                    (<span className="text-lg text-zinc-200 text-left flex-1">{emailsToInvite.length} guest(s) invited</span>)
                    : (<span className="text-lg text-zinc-400 text-left flex-1">Who&apos;s going on the trip?</span>)
                  }
                </button>


              {/*AREA MODAL, CONFIRMAÇÃO*/}
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="cursor-pointer bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium text-sm flex items-center gap hover:bg-yellow-400 max-md:px-2">
                    Confirm Trip <ArrowRight/>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      Confirm trip creation.
                    </DialogTitle>
                    <DialogDescription>
                      To complete the creation of the trip to <strong className="text-zinc-50">{local}</strong> from <strong className="text-zinc-50">{range?.from ? format(range.from, 'MM-dd-yyyy') : ''} to {range?.to ? format(range.to, 'MM-dd-yyyy') : ''}</strong>, please fill in your details below:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <form onSubmit={createNewTrip} className="flex flex-col gap-2">
                        <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                          <User className="size-5 text-zinc-400"/>
                          <input type="text" name="username" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Your full name" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                        </div>
                        <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                          <Mail className="size-5 text-zinc-400"/>
                          <input type="email" name="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="Your personal email" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                        </div>
                        <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                          <KeyIcon className="size-5 text-zinc-400"/>
                          <input type="text" name="password" value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} placeholder="Event key" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                        </div>
                        <p className="text-xs text-zinc-400">After submitting this form, we will send all the necessary data to your email, in case you forget the information.</p>
                        <button disabled={ownerEmail=='' || ownerName==''} className="cursor-pointer bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400 disabled:bg-lime-300 disabled:text-lime-500 disabled:cursor-not-allowed">
                          Create Trip
                        </button>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
                
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm"> By planning your trip with plann.er, you automatically agree <br />
        to our  <a href="#" className="text-zinc-300 underline"> terms of use</a> and <a href="#" className="text-zinc-300 underline">privacy policy</a>. </p>
      </div>

      {modalScreen && (
       <ModalScreenInvite 
        closeModalScreen={() => setModalScreen(false)} 
        addEmailToInvite={addEmailToInvite}
        removeEmailToInvite={removeEmailToInvite}
        emailsToInvite={emailsToInvite}
       />
      )}

    </div>
  )
}
