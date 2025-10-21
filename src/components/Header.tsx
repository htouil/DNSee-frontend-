import { useEffect, useRef, useState } from "react";

interface recordsFormat {
  domain: string;
  a: string | null;
  aaaa: string | null;
  cname: string | null;
  mx: string | null;
  ns: string | null;
  soa: string | null;
  txt: string | null;
}

function Header() {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [records, setRecords] = useState([]);
  // const [a, setA] = useState([]);
  // const [aaaa, setAaaa] = useState([]);
  // const [cname, setCname] = useState([]);
  // const [mx, setMx] = useState([]);
  // const [ns, setNs] = useState([]);
  // const [soa, setSoa] = useState([]);
  // const [txt, setTxt] = useState([]);

  const searchBtn = useRef<HTMLButtonElement | null>(null);

  // For testing:
  const recordColumns = ["domain", "a", "aaaa", "cname", "mx", "ns", "soa", "txt"];
  const recs: recordsFormat[] = [
    {
      domain: "example.com",
      a: "192.0.2.1",
      aaaa: "2001:db8::1",
      cname: "www.example.com",
      mx: "10 mail.example.com",
      ns: null,
      soa: "ns1.example.com",
      txt: null,
    },
    {
      domain: "anotherexample.org",
      a: "203.0.113.45",
      aaaa: null,
      cname: "alias.another.org",
      mx: "5 mail.another.org",
      ns: null,
      soa: "ns1.another.org",
      txt: null,
    },
  ];

  async function fetchRecords(value: string) {
    try {
      const response = await fetch(`http://localhost:5000/dns/${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecords(data);
      // setA(records[1]);
      console.log(records);
    } catch (err) {
      console.error("Failed to fetch DNS records:", err);
    }
  }

  // useEffect(() => {
  //   const displayData = async () => {
  //     await fetchRecords(inputValue);
  //     setIsVisible(false);
  //   };
  //   searchBtn.current?.addEventListener("click", displayData);
  //   return () => searchBtn.current?.removeEventListener("click", displayData);
  // }, [inputValue]);

  return (
    <div className="flex flex-col items-center gap-20 mt-20">
      <div className="flex gap-3 items-center">
        <img
          src="./src/assets/binoculars.svg"
          alt="binoculars"
          className="size-24"
        />
        <h1 className="text-8xl font-bold text-cyan-500 tracking-wide">
          DNSee
        </h1>
      </div>
      <p
        className={`${
          isVisible ? "opacity-100" : "opacity-0 hidden"
        } transition duration-500 ease-in-out text-white text-5xl`}
      >
        Engine To Search For DNS Records of a Domain
      </p>
      <div className="flex px-10 py-5 gap-5 items-center border rounded-4xl w-5xl bg-white/10 backdrop-blur-md">
        <input
          type="text"
          placeholder="Enter domain to search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow text-white text-4xl h-full outline-none pl-4 border-l-4 border-white"
        />
        <button
          onClick={async () => {
            await fetchRecords(inputValue);
            setIsVisible(false);
          }}
          className="border text-white text-3xl py-3 px-7 rounded-sm justify-self-end cursor-pointer"
        >
          See
        </button>
      </div>
      <div
        className={`${
          isVisible ? "hidden" : ""
        } overflow-x-auto border rounded-2xl`}
      >
        <table className="bg-white/10 backdrop-blur-md text-white divide-y-4 divide-white/70">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                Domain Name
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                A record
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                AAAA record
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                CNAME
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                MX record
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                NS record
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                SAO record
              </th>
              <th className="px-6 py-3 text-left text-white text-xl font-semibold">
                TXT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/10 divide-y divide-white">
            {/* {recs.map((rec, idx) => (
              <tr key={idx}>
                {recordColumns.map((col) => (
                  <td
                    key={col}
                    className="px-6 py-3 text-center text-white text-xl"
                  >
                    {rec[col as keyof recordsFormat] ?? "-"}
                  </td>
                ))}
              </tr>
            ))} */}
            <tr>
              {recordColumns.map((col) => (
                <td
                  key={col}
                  className="px-6 py-3 text-center text-white text-xl"
                >
                  {records[0] ?? "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Header;
