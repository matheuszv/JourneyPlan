import { CircleDashed, CircleCheck } from "lucide-react"
import { format } from "date-fns"
import { setMadeActivitie } from "@/app/trips/[id]/functions"

interface Activities{
    id: string,
    travelId: string,
    date: Date,
      activities: 
        {
          id: string,
          title: string,
          occurs_at: string
          made: boolean,
        }[]
}

interface DaysPlans{
    activity: Activities,
}

export function DaysPlans({activity}: DaysPlans){
    const hoje = new Date()
    let background = ""

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    new Date(activity.date) >= hoje ? background="bg-zinc-900" : background="bg-zinc-800 text-zinc-400"
    
    return(
        <div>
            <div className="space-y-8 w-full">
                <div className="space-y-2.5 w-full">
                    <div className="flex gap-3 items-baseline">
                        <h3 className="text-zinc-200 text-xl">Day {format(activity.date, "d")}</h3>
                        <span className="text-xs text-zinc-500">{format(activity.date, "EEEE")}</span>  
                    </div>
                    {activity.activities.length > 0 ? 
                        (
                            <div className="flex flex-col gap-2 items-center">
                                {activity.activities.map(plans => {
                                    return(
                                        <div key={plans.occurs_at} className={`${background} flex flex-1 justify-between items-center rounded-lg w-full border border-zinc-800 px-4 py-2.5`}>
                                            <div className="flex gap-2 items-center">
                                                {plans.made == true ? (<CircleCheck className="size-5 text-green-500 cursor-pointer" onClick={() => setMadeActivitie(activity.id, plans.id)}/>) : (<CircleDashed className="size-5 text-zinc-500 cursor-pointer" onClick={() => setMadeActivitie(activity.id, plans.id)}/>)
                                                }
                                                <p>{plans.title}</p>
                                            </div>
                                            <span className="text-xs text-zinc-500">{plans.occurs_at}</span> 
                                        </div>
                                    )
                                })}
                            </div>
                        )
                        : (<p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>) 
                    }
                </div>
            </div>
        </div>    
    )
}

/*
    
                <div className="space-y-2.5 w-full">
                    <div className="flex gap-3 items-baseline">
                        <h3 className="text-zinc-200 text-xl">Dia 18</h3>
                        <span className="text-xs text-zinc-500">Domingo</span>  
                    </div>  
                    <div className="bg-zinc-900 flex flex-1 justify-between items-center rounded-lg w-full border border-zinc-800 px-4 py-2.5">
                        <div className="flex gap-2 items-center">
                            <CircleCheck className="size-5 text-lime-300"/>
                            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <span className="text-xs text-zinc-500">8:00h</span> 
                    </div>
                    <div className="bg-zinc-900 flex flex-1 justify-between items-center rounded-lg w-full border border-zinc-800 px-4 py-2.5">
                        <div className="flex gap-2 items-center">
                            <CircleDashed className="size-5 text-zinc-500"/>
                            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <span className="text-xs text-zinc-500">18:00h</span> 
                    </div>
                </div>  
*/