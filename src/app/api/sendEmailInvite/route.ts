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
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: '🧭 Join Me on This Journey!',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333;">Hey! It’s ${body.owner_name} here 😄 ✨</h2>
            <p style="font-size: 16px; color: #555;">
              I just wrapped up our <strong>Journey Plan</strong> and guess what? You’re totally invited!
              Everything’s mapped out — cool spots, fun stuff to do, good vibes only. It’s gonna be awesome, and it wouldn’t be the same without you. Let’s make some memories! 🌍✈️
            </p>
            <p style="font-size: 16px; margin: 20px 0;">
              📌 <strong>Access our plan here:</strong><br/>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/trips/${body.id}" style="display: inline-block; margin-top: 10px; background-color: #4F46E5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                View Journey Plan
              </a>
            </p>
            
            <hr style="margin: 30px 0;" />
            <p style="font-size: 14px; color: #999;">
              This is an automated message — please do not reply.<br/>
            </p>
            <p style="font-size: 16px; color: #555;">Planned Trips! 🌍✈️</p>
          </div>
        </div>
      `,
      }

      try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Mensagem enviada com sucesso!" }, { status: 200 });
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: JSON.stringify(error) }, { status: 500 });
      }
      
    }
  

