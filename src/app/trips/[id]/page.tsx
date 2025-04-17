/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { setNewLink, setNewEmail, setNewActivie, sendEmailInvite } from './functions'
import { DaysPlans } from "@/components/daysPlans";
import { LocalDateTrip } from "@/components/navbar";
import { Calendar, Clock, KeyIcon, Link, Link2, Mail, Plus, Send, Tag, UserPlus } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomDialog } from '@/components/customDialog';


interface TripsPlans{
        id: string;
        local: string;
        ownerName: string;
        ownerEmail: string;
        dayStart: Date;
        dayEnd: Date;
        emailsInvite: string;
        links: string | null;
        password: string;
}

interface Activities{
    id: string,
    travelId: string,
    date: Date,
    activities: any,
}


export default function Trips({travelPlans, plans}: {travelPlans: TripsPlans | null; plans: Activities[]}){

    const participants = travelPlans?.emailsInvite.split(',')
    const importantLinks = travelPlans?.links?.split('(|)').map((links: any) => {
        const linksplited = links.split('(ç-—-ç)')
        return {
            title: linksplited[0],
            URL: linksplited[1]
        }
    })

    return(
        <div className="max-w-6xl px-6 py-8 mx-auto space-y-8">
            <LocalDateTrip 
                destination={travelPlans?.local}
                dayStart={travelPlans?.dayStart ? travelPlans?.dayStart : new Date()}
                dayEnd={travelPlans?.dayEnd  ? travelPlans?.dayEnd : new Date()}
                ownerName={travelPlans?.ownerName}
            />
            <main className="flex gap-16 flex-wrap px-4">
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-zinc-50 text-3xl font-semibold max-md:text-2xl">Activities</h2>
                        <CustomDialog
                            triggerButton={
                                <button className="cursor-pointer bg-lime-300 rounded-lg text-lime-950 font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400 max-md:text-sm max-md:px-3">
                                <Plus className="size-5" />
                                Register Activity
                                </button>
                            }
                            title="Register Activity."
                            description="All guests can view the activities."
                            onSubmit={(e) => setNewActivie(e, travelPlans)}>
                                    <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                        <Tag className="size-5 text-zinc-400"/>
                                        <input required type="text" name="title" placeholder="What is the activity?" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                    </div>
                                    <div className=" flex gap-3 w-full">
                                        <div className="flex-1 gap-3 bg-zinc-950 rounded-lg items-center flex border border-zinc-800 p-3.5">
                                            <Calendar className="size-5 text-zinc-400"/>
                                            <input required type="date" name="occurs_at_day" placeholder="Day" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light input-data"/>
                                        </div>
                                        <div className="gap-3 bg-zinc-950 rounded-lg items-center flex border border-zinc-800 p-3.5 w-36">
                                            <Clock className="size-5 text-zinc-400"/>
                                            <input type="time" name="occurs_at_time" placeholder="Time" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light input-hora"/>
                                        </div>
                                    </div>
                                    <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                            <KeyIcon className="size-5 text-zinc-400"/>
                                            <input type="text" name="key" placeholder="Event key" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                        </div>
                                    <button className="cursor-pointer bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400">
                                        Save activity
                                    </button>
                        </CustomDialog>
                    </div>
                    {plans?.map((activity: Activities, index: number) => {
                        return(
                            <DaysPlans 
                                key={index}
                                activity={activity}
                            />
                        )
                    })}  
                </div>
                {/*SIDEBAR */}
                <div className="w-80 space-y-6">
                    <div className="gap-6 flex flex-col">
                    <h3 className="text-xl font-semibold">Important Links</h3>
                        <div className="flex flex-col">
                            
                            {!importantLinks || importantLinks.length == 0 || importantLinks[0].title=='' ? (
                                <></>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {importantLinks.map((link: any, index: number) => {
                                        return(  
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="flex flex-col gap-1">
                                                    <h4>{link.title}</h4>
                                                    <a target="_blank" className="text-zinc-400 text-xs w-[250px] h-5 truncate" href={link.URL}>{link.URL}</a>
                                                </div>
                                                <Link2 className="size-5 text-zinc-400 cursor-pointer" onClick={async () => await (navigator.clipboard.writeText(link.URL),
                                                    toast.success('Link copied!', { autoClose: 1300, hideProgressBar: true }))}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            <ToastContainer theme="dark"/> 
                        </div>
                        <CustomDialog
                            triggerButton={
                                <button className="cursor-pointer bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-700">
                                    <Plus className="size-5"/>
                                    Add new link
                                </button>
                            }
                            title="Register new link."
                            description="All guests can view the links."
                            onSubmit={(e) => setNewLink(e, travelPlans)}>
                                <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                        <Tag className="size-5 text-zinc-400"/>
                                        <input required type="text" name="title" placeholder="Title of the link." className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                    </div>
                                    <div className="flex gap-3 w-full">
                                        <div className="flex-1 gap-3 bg-zinc-950 rounded-lg items-center flex border border-zinc-800 p-3.5">
                                            <Link className="size-5 text-zinc-400"/>
                                            <input type="text" name="url" placeholder="Link" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                        </div>
                                    </div>
                                    <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                        <KeyIcon className="size-5 text-zinc-400"/>
                                        <input type="text" name="key" placeholder="Event key" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                    </div>
                                    <button className="cursor-pointer bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400">
                                        Save new link
                                    </button>
                            </CustomDialog>
                        <div className="w-full h-px bg-zinc-800"/>

                        <h3 className="text-xl font-semibold">Guests</h3>
                        <div className="gap-3 flex flex-col">
                            {participants?.map((email: string, index:number)=> {
                                return(
                                    <div key={index} className="flex justify-between items-center" title="Send email" >
                                        <div className="flex flex-col">
                                            <h4>{`Convidado ${index+1}` }</h4>
                                            <span className="text-zinc-400 text-xs">{email}</span>
                                        </div>
                                        <div title="Send email inviting">   
                                            <Send className="size-5 text-white cursor-pointer" onClick={() => sendEmailInvite(email, travelPlans, toast)}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <CustomDialog
                            triggerButton={
                                <button className="cursor-pointer bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-700">
                                    <UserPlus className="size-5"/>
                                    Add new Guest
                                </button>
                            }
                            title="Register new guest."
                            description="Register a new guest to the trip."
                            onSubmit={(e) => setNewEmail(e, travelPlans)}>
                                    <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                        <Mail className="size-5 text-zinc-400"/>
                                        <input required type="text" name="email" placeholder="Email" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                    </div>
                                    <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                                        <KeyIcon className="size-5 text-zinc-400"/>
                                        <input type="text" name="key" placeholder="Event key" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
                                    </div>
                                    <button className="cursor-pointer bg-lime-300 text-lime-950 w-full h-12 rounded-lg flex items-center justify-center gap-3 hover:bg-yellow-400">
                                        <UserPlus className="size-5"/>
                                        Add a Guest
                                    </button>
                        </CustomDialog>
                    </div>
                </div>
            </main>
        </div>
    )
}

