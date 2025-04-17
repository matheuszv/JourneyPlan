/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const body = await req.json();
    const [year, month, day] = body.occurs_at.split("-").map(Number);
    const date = new Date(year, month - 1, day); // isso cria no horário local (sem UTC)
    try {
      const result = await prisma.activities.findFirst({
        where: {
          AND: [
            { travelId: body.id },
            { date: date }
        ]}
      });

      if(result) {
        const activities = result.activities as any[]
          activities?.push({
          id: new Date().toString(),
          title: body.title,
          occurs_at: body.occurs_at_time,
          made: false
        })

        try {
          const finalresult = await prisma.activities.update({
            where: { id: result.id },
            data: {
                activities: activities,
            }
          })

          return NextResponse.json({
            finalresult,
          }, { status: 200 });

        } catch(error) {
          console.error('Error fetching events:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }

      } else {
        try {
          const finalresult = await prisma.activities.create({
            data: {
              date: date,
              travelId: body.id,
                activities: [
                  {
                    id: body.occurs_at,
                    title: body.title,
                    occurs_at: body.occurs_at_time,
                    made: false
                  }
                ],
            }
          })

          return NextResponse.json({
            finalresult,
          }, { status: 200 });

        } catch(error) {
          console.error('Error fetching events:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }

      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function PUT(req: NextRequest) {
    const body = await req.json();
    try {
      const result = await prisma.activities.findFirst({
        where: {id: body.id }
      });

      if(result) {
        const activities = result.activities as any[]
        const activitieMade = activities.map(activity =>
            activity.id === body.activitieId 
              ? { ...activity, made: !(activity.made) }
              : activity
          );
        try {
          const finalresult = await prisma.activities.update({
            where: { id: result.id },
            data: {
                activities: activitieMade,
            }
          })

          return NextResponse.json({
            finalresult,
          }, { status: 200 });

        } catch(error) {
          console.error('Error fetching events:', error);
          return NextResponse.json({ error: 'Internal Server Error:' }, { status: 500 })
        }

      } else {
        return NextResponse.json({
          error: 'Activitie day not found'
        }, { status: 404 });
      }
       
    } catch(error) {
          console.error('Error fetching events:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }  finally {
      await prisma.$disconnect();
    }
  }
  