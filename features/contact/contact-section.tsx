'use client'
import { m, useInView } from 'framer-motion'




import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


export function ContactSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      projectType: formData.get('projectType') as string,
      message: formData.get('message') as string,
    }

    const whatsappMessage = `Olá Isllan!
    
Meu nome é *${data.name}*.
E-mail: ${data.email}
Telefone: ${data.phone || 'Não informado'}
Assunto: ${data.projectType || 'Não informado'}

*Mensagem:*
${data.message}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/5527996414848?text=${encodedMessage}`

    // Delay for visual effect
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    window.open(whatsappUrl, '_blank')
    
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-16"
        >
          <span className="text-primary font-mono text-xs lg:text-sm tracking-wider mb-4 block uppercase">
            {t.contact.sectionLabel}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t.contact.description}
          </p>
        </m.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 rounded-3xl bg-secondary/10 border border-border">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.contact.form.successTitle}</h3>
                <p className="text-muted-foreground">
                  {t.contact.form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t.contact.form.name}
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder={t.contact.form.namePlaceholder}
                      required
                      className="bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t.contact.form.email}
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.contact.form.emailPlaceholder}
                      required
                      className="bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors h-11"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t.contact.form.phone}
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder={t.contact.form.phonePlaceholder}
                      className="bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-project-type" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t.contact.form.projectType}
                    </label>
                    <Select name="projectType">
                      <SelectTrigger id="contact-project-type" className="bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors h-11">
                        <SelectValue placeholder={t.contact.form.projectPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clt">CLT / PJ (Full-time)</SelectItem>
                        <SelectItem value="backend">Backend / APIs</SelectItem>
                        <SelectItem value="automation">Automação / RPA</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    {t.contact.form.message}
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    autoComplete="off"
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                    className="min-h-[120px] bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      {t.contact.form.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t.contact.form.submit}
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </m.div>

          <aside className="space-y-4 lg:space-y-6">
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-2xl bg-secondary/20 border border-border space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Links Diretos
                </h3>
                <div className="grid gap-3">
                  {[
                    { icon: Mail, label: 'Email', value: 'isllan.toso79@gmail.com', href: 'mailto:isllan.toso79@gmail.com' },
                    { icon: Linkedin, label: 'LinkedIn', value: '/in/isllantoso', href: 'https://linkedin.com/in/isllantoso' },
                    { icon: Github, label: 'GitHub', value: '@Isllanrx', href: 'https://github.com/Isllanrx' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-all border border-transparent hover:border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border/50">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                          {link.label}
                        </div>
                        <div className="text-sm font-medium">
                          {link.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Disponibilidade
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.contact.availability}
                </p>
              </div>
            </m.div>
          </aside>
        </div>
      </div>
    </section>
  )
}
