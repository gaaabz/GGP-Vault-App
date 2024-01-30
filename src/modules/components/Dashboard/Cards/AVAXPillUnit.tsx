export function AVAXPillUnit({ value = null }) {
  return (
    <span className="pointer-events-none flex h-full flex-row items-center justify-start space-x-2 rounded-full bg-indigo-700 p-1.5 pl-2 pr-4 text-xs text-white">
      <svg
        className="rounded-full bg-white"
        fill="white"
        height="27"
        viewBox="0 0 19 19"
        width="27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M18.9874 9.50006C18.9874 14.7398 14.7369 18.9874 9.49368 18.9874C4.25046 18.9874 0 14.7398 0 9.50006C0 4.26033 4.25046 0.0126953 9.49368 0.0126953C14.7369 0.0126953 18.9874 4.26033 18.9874 9.50006ZM6.80344 13.2756H4.96098C4.57383 13.2756 4.38259 13.2756 4.26599 13.201C4.14004 13.1194 4.06308 12.9842 4.05375 12.835C4.04675 12.6976 4.14238 12.5297 4.33362 12.1941L8.88287 4.18076C9.07645 3.84048 9.1744 3.67033 9.298 3.60741C9.43094 3.53982 9.58954 3.53982 9.72248 3.60741C9.84608 3.67033 9.94404 3.84048 10.1376 4.18076L11.0728 5.81223L11.0776 5.82056C11.2867 6.18561 11.3927 6.37073 11.439 6.56503C11.4903 6.77712 11.4903 7.00087 11.439 7.21296C11.3924 7.40874 11.2874 7.5952 11.0752 7.96577L8.68555 12.1871L8.67937 12.1979C8.46892 12.566 8.36226 12.7525 8.21445 12.8933C8.05352 13.0471 7.85994 13.159 7.64771 13.222C7.45413 13.2756 7.23724 13.2756 6.80344 13.2756ZM11.4563 13.2756H14.0963C14.4858 13.2756 14.6817 13.2756 14.7984 13.1987C14.9243 13.1171 15.0036 12.9796 15.0106 12.8305C15.0173 12.6975 14.9238 12.5361 14.7405 12.22C14.7342 12.2093 14.7278 12.1983 14.7214 12.1872L13.399 9.92642L13.3839 9.90097C13.1981 9.58694 13.1043 9.42836 12.9838 9.36706C12.851 9.29946 12.6946 9.29946 12.5617 9.36706C12.4404 9.42999 12.3425 9.59547 12.1489 9.92875L10.8312 12.1895L10.8267 12.1973C10.6338 12.53 10.5374 12.6963 10.5444 12.8328C10.5537 12.982 10.6306 13.1194 10.7566 13.201C10.8709 13.2756 11.0668 13.2756 11.4563 13.2756Z"
          fill="#006100"
          fillRule="evenodd"
        />
      </svg>
      <div className="font-bold tracking-widest">ggGGP</div>
      {value ? <div>{(Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')}</div> : null}
    </span>
  )
}
