"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesData = [
  {
    id: "001",
    title: "الحراسات الأمنية",
    description:
      "تأمين المنشآت بحراسات ثابتة أو دوريات متحركة، حسب طبيعة كل موقع.",
    tags: ["حراسات ثابتة", "دوريات متحركة", "تأمين منشآت"],
    image: "/security-team.webp", // Replace with your Edarah guard asset
  },
  {
    id: "002",
    title: "المراقبة الإلكترونية",
    description: "كاميرات مراقبة مرتبطة بغرفة تحكم مركزية لرصد وتوثيق مستمر.",
    tags: ["كاميرات مراقبة", "غرف تحكم مركزية", "رصد مستمر"],
    image: "/security-team.webp",
  },
  {
    id: "003",
    title: "تأمين الفعاليات والمناسبات",
    description:
      "تغطية أمنية متكاملة للفعاليات، تشمل إدارة الدخول وضبط الحشود.",
    tags: ["تغطية أمنية", "إدارة الدخول", "ضبط الحشود"],
    image: "/security-team.webp",
  },
  {
    id: "004",
    title: "الحماية الشخصية (VIP)",
    description:
      "فرق حماية مؤهلة لمرافقة وتأمين كبار الشخصيات وفق بروتوكولات أمنية دقيقة.",
    tags: ["مرافقة وتأمين", "كبار الشخصيات", "بروتوكولات أمنية"],
    image: "/security-team.webp",
  },
  {
    id: "005",
    title: "إدارة المخاطر والتقييم الأمني",
    description: "تقييم المخاطر الأمنية للمنشآت وتقديم خطط وقائية مبنية عليها.",
    tags: ["تقييم المخاطر", "خطط وقائية", "استشارات أمنية"],
    image: "/security-team.webp",
  },
];

export default function EdarahServicesSection() {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section
      dir="rtl"
      className="relative w-full min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden"
    >
      {/* Background Accent Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#7A1B1E]/10 to-transparent pointer-events-none" />

      {/* Main Header */}
      <div className="mb-16 text-right">
        <div className="flex items-center justify-end gap-3 mb-2">
          <span className="text-sm md:text-base text-zinc-400">
            ماذا نقدم - بمنهجية إدارة
          </span>
          <div className="w-8 h-8 rounded-full bg-[#7A1B1E] flex items-center justify-center">
            <span className="text-white text-xs">◆</span>
          </div>
        </div>
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          الخدمات
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Column: Sub-service Tags */}
        <div className="lg:col-span-3 order-3 lg:order-1 flex flex-col gap-3 justify-center min-h-[300px]">
          <h4 className="text-zinc-500 text-sm mb-4 ps-2">الخدمات الفرعية</h4>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
              className="flex flex-wrap lg:flex-col gap-3"
            >
              {activeService.tags.map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-sm text-center text-zinc-300 hover:bg-[#7A1B1E] hover:text-white transition-colors cursor-default"
                >
                  {tag}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Column: Image & Visuals */}
        <div className="lg:col-span-5 order-2 lg:order-2 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-[#7A1B1E]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
              {/* Replace with next/image in your project */}
              <img
                src={activeService.image}
                alt={activeService.title}
                className="object-cover w-full h-full opacity-80"
              />
              <div className="absolute bottom-6 right-6 z-20">
                <button className="bg-zinc-800/80 backdrop-blur-sm hover:bg-[#7A1B1E] text-white text-xs px-4 py-2 rounded-full transition-all">
                  اقرأ المزيد
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Service List */}
        <div className="lg:col-span-4 order-1 lg:order-3 flex flex-col gap-4 w-full">
          {servicesData.map((service) => {
            const isActive = activeService.id === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`group cursor-pointer border-b border-zinc-800 pb-4 transition-all duration-300 ${isActive ? "mt-0" : "opacity-60 hover:opacity-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-300 ${isActive ? "text-[#7A1B1E]" : "text-zinc-300 group-hover:text-white"}`}
                  >
                    {service.title}
                  </h3>
                  <span className="text-zinc-600 font-mono text-sm">
                    ({service.id})
                  </span>
                </div>

                {/* Expandable Description */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-400 text-sm leading-relaxed pt-2 pe-4 border-r-2 border-[#7A1B1E]">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
