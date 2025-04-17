import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'

interface ModalScreenInvite{
    closeModalScreen: () => void
    addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailToInvite: (email: string) => void
    emailsToInvite: string[]
}

export function ModalScreenInvite({closeModalScreen, addEmailToInvite, removeEmailToInvite, emailsToInvite}: ModalScreenInvite){
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
            <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3 max-md:w-[360px]">
            <div className="flex justify-between">            
                <h2 className="text-white font-semibold text-lg ">Select guests</h2>
                <button type="button" className='cursor-pointer' onClick={closeModalScreen}><X/></button>
            </div>
            <p className="text-zinc-400 text-sm">Guests will receive emails to confirm their participation in the trip.</p>
            <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => {
                return (
                    <div key={email} className="flex bg-zinc-800 gap-2 rounded-md p-2 items-center">
                    <p className="text-zinc-300 text-sm">{email}</p><button onClick={() => removeEmailToInvite(email)}><X className="size-4"/></button>
                    </div>
                )
                })}
                
            </div>
            <div className="h-px w-full bg-zinc-800" />
            <form onSubmit={addEmailToInvite} className=" bg-black rounded-lg flex items-center gap-2 w-full border p-2.5">
                <AtSign className="size-5 text-zinc-400"/>
                <input type="email" name="email" placeholder="Enter guest's email" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"/>
                <button className="cursor-pointer bg-lime-300 text-lime-950 rounded-lg p-3 flex font-medium items-center gap-1 hover:bg-yellow-400 max-md:px-2">
                    Invite <Plus className="size-5"/>
                </button>
            </form>
            
            </div>
        </div>
    )
}