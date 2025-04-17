import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    
    try {
      const result = await prisma.travel.create({
        data: {
            local: body.local,
            ownerName: body.owner_name,
            ownerEmail: body.owner_email,
            dayStart: body.starts_at,
            dayEnd: body.ends_at,
            emailsInvite: body.emailsToInvite.join(","),
            links: '',
            password: body.password,
        },
      });

      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: body.owner_email,
        subject: '🧭 Your Journey Plan is Ready!',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333;">Hello, dear ${result.ownerName}! ✨</h2>
            <p style="font-size: 16px; color: #555;">
              Your personalized <strong>Journey Plan</strong> is ready. Inside, you’ll find all the details of your trip neatly organized and easy to access.
            </p>
            <p style="font-size: 16px; margin: 20px 0;">
              📌 <strong>Access your plan here:</strong><br/>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/trips/${result.id}" style="display: inline-block; margin-top: 10px; background-color: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                View Journey Plan
              </a>
            </p>
            <p style="font-size: 16px;">
              🔑 <strong>Your access key:</strong><br/>
              <span style="font-size: 18px; font-weight: bold; color: #111;">${result.password}</span>
              <p style="font-size: 16px; color: #555;">
                Only share this key with people you trust and who can help organize the trip!
              </p>
            </p>
            <hr style="margin: 30px 0;" />
            <p style="font-size: 14px; color: #999;">
              This is an automated message — please do not reply.<br/>
            </p>
            <p style="font-size: 16px; color: #555;">Planned Trips! 🌍✈️<br/>— The Journey Team</p>
          </div>
        </div>
      `,
      }

            
      try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ result }, { status: 200 });
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: JSON.stringify(error) }, { status: 500 });
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
      const result = await prisma.travel.update({
        where: {id: body.id},
        data: {
            emailsInvite: body.emails=='' ? body.newEmail : body.emails + ',' + body.newEmail,
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
  
