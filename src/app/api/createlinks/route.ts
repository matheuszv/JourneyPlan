import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const body = await req.json();
    
    
    const newLink = '(|)' + body.title + '(ç-—-ç)' + body.url

    try {
      const result = await prisma.travel.update({
        where: {id: body.id},
        data: {
          links: body.link=='' ?  body.title + '(ç-—-ç)' + body.url : body.link + newLink
        },
      });
      return NextResponse.json({
        result,
      }, { status: 200 });
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
