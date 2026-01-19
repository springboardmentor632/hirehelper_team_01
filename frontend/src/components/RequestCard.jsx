import React from "react";

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text, search) => {
    if (!search || !text) return text;
    const safeSearch = escapeRegExp(search);
    const regex = new RegExp(`(${safeSearch})`, "gi");
    return text.split(regex).map((part, i) =>
        part.toLowerCase() === safeSearch.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
        ) : (part)
    );
};

const RequestCard = ({
    name, imageUrl, rating, reviews, time, distance,
    message, job, duration, slot, search, status,
    onAccept, onDecline
}) => {
    const initials = name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "R";
    const isAccepted = status === 1;

    return (
        <div className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
            {/* Top Row: Requester Info + Buttons */}
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#3A5B22] flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm">
                        {imageUrl ? (
                            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                        ) : (initials)}
                    </div>

                    {/* Meta Info */}
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1E293B] text-lg">
                                {highlightText(name, search)}
                            </h3>
                            <span className="text-sm text-[#64748B]">
                                · {rating} ({reviews} reviews)
                            </span>
                        </div>
                        <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">
                            {time} · {distance}
                        </p>
                    </div>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden sm:flex gap-3">
                    {isAccepted ? (
                        <button disabled className="bg-[#3A5B22] text-white rounded-lg font-bold w-[120px] h-[40px] shadow-sm">
                            ✓ Accepted
                        </button>
                    ) : (
                        <>
                            <button onClick={onAccept} className="bg-[#3A5B22] text-white rounded-lg font-bold w-[90px] h-[40px] hover:brightness-110 transition shadow-sm">
                                Accept
                            </button>
                            <button onClick={onDecline} className="bg-white text-[#334155] border border-[#CBD5E1] rounded-lg font-bold w-[90px] h-[40px] hover:bg-gray-50 transition shadow-sm">
                                Decline
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Middle Row: The Message Box */}
            <div className="mt-5 bg-white rounded-lg p-4 border border-[#3A5B22]/10 shadow-inner">
                <p className="text-sm text-[#475569] leading-relaxed">
                    {highlightText(message || "I want to work on the task you have provided and its description.", search)}
                </p>
            </div>

            {/* Bottom Row: Job Context */}
            <div className="mt-4 flex flex-col gap-1">
                <p className="text-sm text-[#64748B] font-medium">
                    Requesting for: <span className="text-[#1E293B] font-bold">{highlightText(job, search)}</span>
                </p>
                <p className="text-xs text-[#94A3B8]">
                    Job: {duration} · {slot}
                </p>
            </div>

            {/* Mobile Buttons */}
            <div className="flex sm:hidden gap-3 mt-5">
                {isAccepted ? (
                    <button disabled className="w-full bg-[#3A5B22] text-white py-3 rounded-lg font-bold shadow-sm">✓ Accepted</button>
                ) : (
                    <>
                        <button onClick={onAccept} className="flex-1 bg-[#3A5B22] text-white py-3 rounded-lg font-bold shadow-sm">Accept</button>
                        <button onClick={onDecline} className="flex-1 bg-white text-[#334155] border border-[#CBD5E1] py-3 rounded-lg font-bold shadow-sm">Decline</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestCard;