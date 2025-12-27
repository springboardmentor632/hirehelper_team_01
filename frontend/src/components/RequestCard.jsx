import React from "react";

/* ---------- SAFE HIGHLIGHT ---------- */
const escapeRegExp = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text, search) => {
  if (!search || !text) return text;

  const safeSearch = escapeRegExp(search);
  const regex = new RegExp(`(${safeSearch})`, "gi");

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === safeSearch.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const RequestCard = ({
  name,
  imageUrl,
  rating,
  reviews,
  time,
  distance,
  message,
  job,
  duration,
  slot,
  search,
  onAccept,
  onDecline,
}) => {
  const initials = name
    ? name.split(" ").length > 1
      ? name[0] + name.split(" ")[1][0]
      : name[0]
    : "";

  return (
    <div className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#3A5B22] flex items-center justify-center text-white font-semibold text-lg">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              initials.toUpperCase()
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-[#1E293B]">
                {highlightText(name, search)}
              </h3>
              <span className="text-sm text-[#64748B]">
                · {rating} ({reviews} reviews)
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              {time} · {distance}
            </p>
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={onAccept}
            className="bg-[#3A5B22] text-white rounded-lg font-semibold w-[76px] h-[36px]"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="bg-[#F1F5F9] text-[#334155] rounded-lg font-semibold w-[76px] h-[36px]"
          >
            Decline
          </button>
        </div>
      </div>

      {/* Message */}
      <div className="mt-4 bg-[#F8FAFC] rounded-md p-4 text-sm text-[#475569]">
        {highlightText(message, search)}
      </div>

      {/* Job info */}
      <div className="mt-4">
        <p className="text-sm text-[#64748B]">
          Requesting for:{" "}
          <span className="font-semibold">
            {highlightText(job, search)}
          </span>
        </p>
        <p className="text-xs text-[#94A3B8]">
          Job: {duration} · {slot}
        </p>
      </div>

      {/* Mobile buttons */}
      <div className="flex sm:hidden gap-3 mt-4">
        <button
          onClick={onAccept}
          className="bg-[#3A5B22] text-white rounded-lg font-semibold flex-1 h-9"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="bg-[#F1F5F9] text-[#334155] rounded-lg font-semibold flex-1 h-9"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
