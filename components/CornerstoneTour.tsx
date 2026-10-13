'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Code, Laptop } from 'lucide-react'

type Kind = 'hot' | 'good' | 'bad'

type StepData = {
  short: string
  title: string
  who: string
  dir: 'toClinic' | 'toVG' | 'both' | 'none'
  wire: string
  clinic: { text: string; kind?: Kind }[]
  vg: { text: string; kind?: Kind }[]
  description: string
  details?: {
    points?: string[]
    table?: {
      headers: string[]
      rows: { term: string; est: string; status: string; billed?: boolean }[]
    }
  }
  screenType: 'settings' | 'pms' | 'appointments' | 'workbench'
  caption: string
  code: string
}

const TOUR_STEPS: StepData[] = [
  {
    short: 'Connect',
    title: 'The clinic connects Cornerstone Hub once',
    who: 'Clinic admin in VetGuard Settings. Under 60 seconds.',
    dir: 'toClinic',
    wire: 'PUT /api/v1/integrations/cornerstone',
    clinic: [
      { text: 'Cornerstone Hub REST API endpoint provisioned', kind: 'hot' },
      { text: 'Static API key issued' },
    ],
    vg: [
      { text: 'Validates API key with /api/v1/visits', kind: 'hot' },
      { text: 'Stores key encrypted with Fernet (AES-128)' },
    ],
    description:
      'The admin enters the practice’s Cornerstone Hub base URL and the static API key issued by IDEXX. VetGuard validates the credentials against Cornerstone Hub before saving, so invalid keys are rejected on the spot.',
    details: {
      points: [
        'Credentials are encrypted at rest with Fernet (AES-128-CBC) and never returned over the API.',
        'The UI displays only a masked 4-character hint (e.g. ••••e14a).',
        '"Test connection" pings the Hub endpoint anytime and reports round-trip latency.',
      ],
    },
    screenType: 'settings',
    caption: 'VetGuard settings: Connected status, 5-minute auto-pull active, and live diagnostic latency.',
    code: `PUT /api/v1/integrations/cornerstone
Content-Type: application/json

{
  "hub_url": "https://hub.cornerstonepms.com",
  "api_key": "cs-live-key-9f2b87c4e14a…"
}

← 200 OK
← {
←   "connected": true,
←   "status": "active",
←   "hub_url": "https://hub.cornerstonepms.com",
←   "api_key_hint": "e14a",
←   "last_synced_at": null,
←   "poll_minutes": 5
← }

# Validated instantly against /api/v1/visits?pageSize=1 before being saved.`,
  },
  {
    short: 'Auto-Pull',
    title: 'VetGuard activates automated 5-minute polling',
    who: 'Background worker (Celery Beat schedule).',
    dir: 'both',
    wire: 'sync_all_pms_clinics · every 5 min',
    clinic: [{ text: 'REST endpoints ready (/visits, /soapnotes, /invoicelines)', kind: 'hot' }],
    vg: [
      { text: 'Background worker polls active Cornerstone clinics', kind: 'hot' },
      { text: '10-min overlap window for clock skew enabled' },
    ],
    description:
      'On-premise and hybrid PMS setups do not send outbound webhooks, so VetGuard uses an automated 5-minute auto-pull schedule against the Cornerstone Hub REST API.',
    details: {
      points: [
        'Celery Beat fans out sync_pms_clinic tasks across all active practices.',
        'Admins can also click "Sync now" in VetGuard anytime for immediate ingestion.',
        'A 10-minute overlap window prevents dropped records caused by clock drift.',
      ],
    },
    screenType: 'settings',
    caption: 'The auto-pull banner: 5-minute scheduled poll active with an immediate "Sync now" trigger.',
    code: `# celery_app.conf.beat_schedule
"sync-pms-clinics": {
    "task": "app.tasks.sync_all_pms_clinics",
    "schedule": 300.0,  # Every 5 minutes
}

# Queries database for active Cornerstone clinics:
# PMSConnection.status == 'active' AND Clinic.pms_type == PMSConnection.pms_type

sync_pms_clinic.delay(str(clinic_id))`,
  },
  {
    short: 'First sync',
    title: 'VetGuard pulls the last 30 days of records',
    who: 'Automatic, right after connecting.',
    dir: 'toClinic',
    wire: 'GET /api/v1/visits?modifiedAfter=…',
    clinic: [
      { text: 'Charlie: Feline URI consult', kind: 'hot' },
      { text: 'Max: Canine wellness & vaccines', kind: 'hot' },
    ],
    vg: [
      { text: 'Past 30 days of visits pulled and mapped' },
      { text: 'Baseline revenue audit completed', kind: 'good' },
    ],
    description:
      'On initial connection, VetGuard fetches all visits from the last 30 days. For each visit, the adapter pulls its structured SOAP notes, invoice lines, and patient info.',
    details: {
      points: [
        'Maps raw Cornerstone objects into domain ClinicalNote and Invoice models.',
        'The audit engine runs historical visits through clinical NLP to establish baseline practice leakage.',
        'Subsequent polls only pull records modified since the previous sync timestamp.',
      ],
    },
    screenType: 'appointments',
    caption: 'Appointments list: historical consults pulled and audited automatically from Cornerstone Hub.',
    code: `GET /api/v1/visits?modifiedAfter=2026-09-09T00:00:00Z&pageSize=100
X-Api-Key: cs-live-••••e14a

← 200 OK
← {
←   "items": [
←     { "id": "v-801", "patient_id": "p-102", "visit_date": "2026-09-15T09:30:00Z", "provider_name": "Dr. Sarah Chen" },
←     { "id": "v-802", "patient_id": "p-105", "visit_date": "2026-09-22T14:15:00Z", "provider_name": "Dr. Alex Miller" }
←   ],
←   "page": 1,
←   "pageSize": 100,
←   "hasMore": false
← }`,
  },
  {
    short: 'SOAP saved',
    title: 'Vet saves SOAP notes in Cornerstone',
    who: 'Dr. Miller finishes Bella’s dental procedure notes.',
    dir: 'none',
    wire: 'Written to local Cornerstone PMS database',
    clinic: [
      { text: 'Bella: Dental scaling, tooth extraction, local nerve block, Convenia', kind: 'hot' },
      { text: 'Invoice: Exam, scaling, extraction only (missing block & Convenia)' },
    ],
    vg: [{ text: 'Awaiting next 5-minute poll cycle' }],
    description:
      'Dr. Miller completes Bella’s dental surgery and enters SOAP notes covering the scaling, tooth extraction, a local infraorbital nerve block, and a post-operative Convenia injection. Meanwhile the invoice only has the exam, scaling, and simple extraction.',
    details: {
      points: [
        'Two billable procedures are documented in the Plan but missing from the invoice.',
        'No staff action is needed in VetGuard; the next poll picks the visit up automatically.',
      ],
    },
    screenType: 'pms',
    caption: 'Cornerstone medical record: Bella’s structured SOAP notes vs. invoice with unbilled items.',
    code: `# Cornerstone Record v-904
Patient: Bella (Golden Retriever, 5y)
Doctor: Dr. Alex Miller, DVM

SOAP Plan:
- Full dental scaling & polishing
- Infraorbital nerve block with bupivacaine 0.5%   <-- NOT ON INVOICE
- Surgical closed extraction of tooth 109
- Convenia 10mg/kg SQ injection administered      <-- NOT ON INVOICE

Invoice items entered:
1. EXAM-01 Comprehensive Exam ($75.00)
2. DENT-SCALE Dental Prophy ($240.00)
3. SURG-EXTR Tooth Extraction ($115.00)`,
  },
  {
    short: 'Auto-Audit',
    title: 'Auto-pull fetches the visit and runs clinical NLP',
    who: 'VetGuard worker. Elapsed time: 6.8 seconds.',
    dir: 'toClinic',
    wire: 'GET /soapnotes · /invoicelines · /patients',
    clinic: [{ text: 'Delivers structured S/O/A/P sections and invoice rows' }],
    vg: [
      { text: 'NLP engine parses SOAP sections', kind: 'hot' },
      { text: '2 unbilled procedures flagged ($160 leakage)', kind: 'bad' },
    ],
    description:
      'The 5-minute scheduled poll triggers (or staff click "Sync now"). VetGuard pulls Bella’s visit, SOAP notes, and invoice items, then compares the extracted procedures against billed item codes.',
    details: {
      table: {
        headers: ['Procedure in Notes', 'Est. Value', 'Invoice Status'],
        rows: [
          { term: 'Infraorbital Nerve Block', est: '$65', status: 'Not billed' },
          { term: 'Convenia Antibiotic Inj', est: '$95', status: 'Not billed' },
          { term: 'Dental Scaling & Polish', est: '$240', status: 'Billed', billed: true },
          { term: 'Tooth Extraction #109', est: '$115', status: 'Billed', billed: true },
        ],
      },
      points: [
        'A WebSocket event (audit.updated) notifies open browser tabs instantly without a page reload.',
      ],
    },
    screenType: 'appointments',
    caption: 'Appointments dashboard: Bella appears with 2 unbilled procedures and $160 estimated leakage.',
    code: `GET /api/v1/soapnotes?visitId=v-904
← 200 OK
← { "items": [{ "visit_id": "v-904",
←     "subjective": "Presents for stage 2 periodontal treatment…",
←     "objective": "Severe plaque 108/208. Mobile tooth 109…",
←     "assessment": "Periodontal disease grade III. Tooth 109 non-vital.",
←     "plan": "Full dental scaling. Infraorbital nerve block with bupivacaine. Extraction 109. Convenia 10mg/kg SQ injection post-op." }] }

GET /api/v1/invoicelines?visitId=v-904
← 200 OK
← { "items": [
←     { "line_id": "l-1", "item_code": "EXAM-01", "description": "Comprehensive Exam", "extended_price": 75.0 },
←     { "line_id": "l-2", "item_code": "DENT-SCALE", "description": "Dental Scaling & Polish", "extended_price": 240.0 },
←     { "line_id": "l-3", "item_code": "SURG-EXTR", "description": "Tooth Extraction Simple", "extended_price": 115.0 }
←   ] }

# Worker log:
Extracted 4 clinical events via NLP. Reconciler detected 2 unbilled items. Est leakage: $160.00.`,
  },
  {
    short: 'Review',
    title: 'Manager reviews side-by-side in the Workbench',
    who: 'Practice manager in the VetGuard Reconciliation Workbench.',
    dir: 'none',
    wire: 'Local VetGuard API · no Cornerstone bandwidth',
    clinic: [{ text: 'Untouched (VetGuard is read-only for Cornerstone)' }],
    vg: [
      { text: 'SOAP text beside invoice lines', kind: 'hot' },
      { text: 'Unbilled nerve block & Convenia highlighted', kind: 'bad' },
    ],
    description:
      'The practice manager opens Bella’s consult in the Reconciliation Workbench. The SOAP notes sit beside the invoice, with the unbilled procedures highlighted in red.',
    details: {
      points: [
        'Side-by-side view allows rapid verification without switching windows.',
        'Keyboard navigation: "j"/"k" for next/previous discrepancy, "d" to dismiss with a reason (e.g. complimentary care, bundled fee).',
        'Estimated revenue leakage is calculated for you ($160.00).',
      ],
    },
    screenType: 'workbench',
    caption: 'Reconciliation Workbench: SOAP notes beside the invoice with the unbilled nerve block & Convenia highlighted.',
    code: `GET /api/v1/discrepancies/cs-visit-v904-flag1

← {
←   "event_description": "Infraorbital nerve block with bupivacaine",
←   "severity": "red",
←   "estimated_value_usd": 65.0,
←   "confidence": 0.99,
←   "detected_terms": ["nerve block", "bupivacaine"],
←   "source_consult": {
←     "external_id": "v-904",
←     "patient_name": "Bella",
←     "plan": "…Infraorbital nerve block with bupivacaine 0.5%…"
←   },
←   "invoice_lines": [
←     { "item_code": "EXAM-01", "description": "Comprehensive Exam", "total_usd": 75.0 },
←     { "item_code": "DENT-SCALE", "description": "Dental Scaling & Polish", "total_usd": 240.0 },
←     { "item_code": "SURG-EXTR", "description": "Tooth Extraction Simple", "total_usd": 115.0 }
←   ]
← }`,
  },
  {
    short: 'Bill & Clear',
    title: 'Charge billed in Cornerstone; flag clears automatically',
    who: 'Receptionist in Cornerstone, followed by the next auto-poll.',
    dir: 'toClinic',
    wire: 'GET /api/v1/invoicelines?visitId=v-904',
    clinic: [{ text: 'Reception adds Nerve Block & Convenia to the Cornerstone invoice', kind: 'good' }],
    vg: [
      { text: 'Next sync pulls updated invoice lines', kind: 'hot' },
      { text: 'Flags cleared automatically; leakage $0', kind: 'good' },
    ],
    description:
      'Reception adds the missing Local Nerve Block ($65) and Convenia Injection ($95) to Bella’s invoice in Cornerstone. On the next auto-pull, VetGuard re-reads the invoice and the flags resolve.',
    details: {
      points: [
        'On the next 5-minute poll (or an instant "Sync now"), VetGuard re-reads the invoice.',
        'The reconciliation engine matches the newly billed lines against the clinical events.',
        'Both discrepancies resolve automatically and the clinic recovers $160.00 in revenue.',
      ],
    },
    screenType: 'appointments',
    caption: 'Appointments view: Bella’s consult turns green ("Audited") with 0 remaining flaws.',
    code: `GET /api/v1/invoicelines?visitId=v-904
← 200 OK
← {
←   "items": [
←     { "line_id": "l-1", "item_code": "EXAM-01", "description": "Comprehensive Exam", "extended_price": 75.0 },
←     { "line_id": "l-2", "item_code": "DENT-SCALE", "description": "Dental Scaling & Polish", "extended_price": 240.0 },
←     { "line_id": "l-3", "item_code": "SURG-EXTR", "description": "Tooth Extraction Simple", "extended_price": 115.0 },
←     { "line_id": "l-4", "item_code": "ANES-BLK", "description": "Local Nerve Block Dental", "extended_price": 65.0 },
←     { "line_id": "l-5", "item_code": "MED-CONV", "description": "Convenia Injection 80mg/ml", "extended_price": 95.0 }
←   ]
← }

# Worker re-audit result:
Content hash changed. Re-audited Bella (v-904).
All clinical events now matched to invoice items.
Flags resolved: 2. Remaining leakage: $0.00.`,
  },
  {
    short: 'Safety net',
    title: 'Built-in resilience and zero data loss',
    who: 'Automatic system health & error recovery.',
    dir: 'both',
    wire: '10-min overlap · transaction isolation · retry backoff',
    clinic: [{ text: 'Cornerstone Hub maintenance or network latency' }],
    vg: [
      { text: 'Exponential backoff on 429/502', kind: 'hot' },
      { text: 'Per-consult transaction isolation', kind: 'good' },
    ],
    description:
      'Clinics need reliability without manual upkeep. VetGuard overlaps every poll window, isolates each visit in its own transaction, and backs off gracefully when Cornerstone Hub is slow.',
    details: {
      points: [
        'Clock-skew overlap: every poll syncs from last_synced_at − 10 minutes so no visits are missed.',
        'Transaction isolation: if one malformed record fails, the rest proceed.',
        'Read-only safety: VetGuard never writes or alters medical records in Cornerstone.',
        'Rate-limit resilience: pages capped at 100 records with exponential backoff on HTTP 429 or network errors.',
        'Live diagnostics: admins can test API health anytime from Settings.',
      ],
    },
    screenType: 'settings',
    caption: 'Connection Diagnostics card showing active status, round-trip latency, and zero error state.',
    code: `# Scheduled Polling Logic (pms_sync.py)
started = datetime.now(timezone.utc)
last = connection.last_synced_at
since = (last - timedelta(minutes=10)) if last else started - timedelta(days=30)

# Per-visit transaction isolation:
for visit in visits:
    try:
        async with session_maker() as session:
            await store_consult(session, clinic_id, consult)
            await session.commit()
    except Exception as exc:
        logger.error(f"Failed visit {visit.id}: {exc}")
        # Next visit continues uninterrupted

POST /api/v1/integrations/cornerstone/test
← 200 OK  { "status": "active", "latency_ms": 42 }`,
  },
]

const panel = 'p-3 bg-gray-900 rounded border border-gray-800'

function Screen({ type }: { type: StepData['screenType'] }) {
  if (type === 'settings') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <span className="font-bold text-sm text-gray-200">Cornerstone Integration Settings</span>
          <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
            ● Connected
          </span>
        </div>
        <div className="text-xs text-sky-300 bg-sky-950/50 border border-sky-900 rounded p-3">
          Auto-pull active — VetGuard polls Cornerstone Hub every 5 minutes for new or changed visits.
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={panel}>
            <span className="text-gray-500 block">Hub URL</span>
            <span className="font-mono text-gray-200 break-all">https://hub.cornerstonepms.com</span>
          </div>
          <div className={panel}>
            <span className="text-gray-500 block">API key</span>
            <span className="font-mono text-gray-200">••••e14a</span>
          </div>
          <div className={panel}>
            <span className="text-gray-500 block">Last sync</span>
            <span className="font-mono text-gray-200">Just now (14 changed visits)</span>
          </div>
          <div className={panel}>
            <span className="text-gray-500 block">Diagnostics</span>
            <span className="font-mono text-gray-200">Token active · 42 ms</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 p-3 bg-gray-900 rounded border border-gray-800">
          <span className="text-gray-500 block mb-1">Required API scopes:</span>
          <code className="text-blue-300 font-mono">
            visits:read, soapnotes:read, invoices:read, patients:read
          </code>
        </div>
      </div>
    )
  }

  if (type === 'pms') {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
          <span className="font-bold text-sm text-gray-200">Visit v-904 — Bella (Canine)</span>
          <span className="text-xs text-amber-400 font-mono">Dr. Miller</span>
        </div>
        <div className={`${panel} text-xs space-y-1`}>
          <span className="text-gray-500 block font-semibold">SOAP Plan:</span>
          <p className="text-gray-300 leading-relaxed font-mono">
            1. Full dental scaling &amp; polish. 2. Local infraorbital nerve block (bupivacaine
            0.5%). 3. Surgical closed extraction of tooth 109. 4. Convenia 10mg/kg SQ injection
            administered post-op.
          </p>
        </div>
        <div className={`${panel} text-xs font-mono text-gray-300 space-y-0.5`}>
          <span className="text-gray-500 block font-sans font-semibold mb-1">
            Cornerstone Invoice (only 3 lines):
          </span>
          <div className="flex justify-between"><span>Comprehensive Exam</span><span>$75.00</span></div>
          <div className="flex justify-between"><span>Dental Scaling &amp; Polish</span><span>$240.00</span></div>
          <div className="flex justify-between"><span>Tooth Extraction Simple</span><span>$115.00</span></div>
          <div className="text-rose-400 font-bold bg-rose-950/60 p-1.5 rounded mt-2">
            Missing: Nerve Block ($65) · Convenia ($95)
          </div>
        </div>
      </div>
    )
  }

  if (type === 'appointments') {
    const rows = [
      { p: 'Bella (Canine)', v: 'Dr. Alex Miller', d: 'Today, 2:15 PM', s: '2 Flaws', amt: '$160.00', bad: true },
      { p: 'Max (Canine)', v: 'Dr. Sarah Chen', d: 'Today, 11:30 AM', s: '1 Flaw', amt: '$48.00', bad: true },
      { p: 'Charlie (Feline)', v: 'Dr. Alex Miller', d: 'Yesterday', s: 'Audited', amt: '$0.00', bad: false },
      { p: 'Luna (Feline)', v: 'Dr. Sarah Chen', d: 'Oct 07, 2026', s: 'Audited', amt: '$0.00', bad: false },
    ]
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
          <span className="font-bold text-sm text-gray-200">Audited Consults (Cornerstone)</span>
          <span className="text-xs text-blue-400 font-mono">Appointments</span>
        </div>
        <div className="overflow-x-auto rounded border border-gray-800 bg-gray-900">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-800">
              <tr>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Vet</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Unbilled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {rows.map((r) => (
                <tr key={r.p}>
                  <td className="px-3 py-2 font-medium text-gray-100">{r.p}</td>
                  <td className="px-3 py-2">{r.v}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.d}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.bad
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {r.s}
                    </span>
                  </td>
                  <td className={`px-3 py-2 font-mono ${r.bad ? 'text-rose-400' : 'text-gray-500'}`}>
                    {r.amt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-gray-800">
        <span className="font-bold text-sm text-gray-200">Bella · Visit #v-904 (Cornerstone)</span>
        <span className="text-xs text-rose-400 font-mono">2 discrepancies · -$160.00</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
          <span className="text-gray-500 block font-semibold mb-1">SOAP Notes</span>
          <p className="text-gray-300 font-mono text-[11px] leading-relaxed">
            Plan: Ultrasonic dental scaling and polishing.{' '}
            <mark className="bg-amber-500/30 text-amber-200 px-1 rounded">
              Infraorbital nerve block with bupivacaine
            </mark>{' '}
            Closed surgical extraction tooth 109.{' '}
            <mark className="bg-amber-500/30 text-amber-200 px-1 rounded">
              Convenia 80mg/ml SQ injection post-op
            </mark>
          </p>
        </div>
        <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
          <span className="text-gray-500 block font-semibold mb-1">Cornerstone Invoice Lines</span>
          <div className="text-[11px] font-mono text-gray-300 space-y-0.5">
            <div>EXAM-01: $75</div>
            <div>DENT-SCALE: $240</div>
            <div>SURG-EXTR: $115</div>
            <div className="text-rose-400 font-bold bg-rose-950/60 p-1 rounded mt-1">
              Missing: Nerve block (~$65)
            </div>
            <div className="text-rose-400 font-bold bg-rose-950/60 p-1 rounded">
              Missing: Convenia (~$95)
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-500">
        Extracted via VetGuard NLP engine (confidence 99.4%) · [j/k] next/prev · [d] dismiss with reason
      </p>
    </div>
  )
}

export default function CornerstoneTour() {
  const [step, setStep] = useState(0)
  const [activeTab, setActiveTab] = useState<'screen' | 'code'>('screen')

  useEffect(() => {
    const handleHash = () => {
      const match = /^#s(\d)$/.exec(window.location.hash)
      if (match) {
        setStep(Math.min(TOUR_STEPS.length - 1, Math.max(0, Number(match[1]) - 1)))
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#s${step + 1}`)
  }, [step])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' && step < TOUR_STEPS.length - 1) {
        setStep((s) => s + 1)
      } else if (e.key === 'ArrowLeft' && step > 0) {
        setStep((s) => s - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step])

  const cur = TOUR_STEPS[step]
  const arrowSymbol =
    cur.dir === 'toVG' ? '→' : cur.dir === 'toClinic' ? '←' : cur.dir === 'both' ? '⇄' : '·'

  return (
    <div className="bg-gray-950 text-gray-100 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Systems Stage */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-stretch">
          <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden border-t-4 border-t-amber-600">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="font-bold text-gray-100 text-lg">Cornerstone Hub</h3>
                </div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-900">
                  Clinic System
                </span>
              </div>
              <div className="space-y-2 mt-4">
                {cur.clinic.map((item, i) => (
                  <div
                    key={i}
                    className={`text-xs md:text-sm p-3 rounded-lg border leading-relaxed ${
                      item.kind === 'hot'
                        ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                        : item.kind === 'good'
                          ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                          : 'bg-gray-800/60 border-gray-700/60 text-gray-300'
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-800/80">
              Host Clinic Environment (IDEXX)
            </p>
          </div>

          <div className="md:col-span-1 flex flex-col items-center justify-center py-4 relative">
            <div className="hidden md:block absolute w-full h-0.5 bg-gray-700 left-0 right-0 top-1/2 -translate-y-1/2 border-dashed border-b border-gray-600" />
            <div className="relative z-10 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-center shadow-lg max-w-[150px]">
              <span className="text-xl block text-blue-400 font-bold leading-none mb-1">
                {arrowSymbol}
              </span>
              <span className="font-mono text-[10px] text-gray-300 break-all leading-tight block">
                {cur.wire}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden border-t-4 border-t-blue-500">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="font-bold text-gray-100 text-lg">VetGuard.io</h3>
                </div>
                <span className="text-xs uppercase font-mono tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-900">
                  Billing Audit Engine
                </span>
              </div>
              <div className="space-y-2 mt-4">
                {cur.vg.map((item, i) => (
                  <div
                    key={i}
                    className={`text-xs md:text-sm p-3 rounded-lg border leading-relaxed ${
                      item.kind === 'hot'
                        ? 'bg-blue-950/40 border-blue-700/60 text-blue-200'
                        : item.kind === 'bad'
                          ? 'bg-rose-950/40 border-rose-700/60 text-rose-200'
                          : item.kind === 'good'
                            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                            : 'bg-gray-800/60 border-gray-700/60 text-gray-300'
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-800/80">
              Automated SOAP Reconciliation
            </p>
          </div>
        </div>

        {/* Step Rail */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-3 shadow-lg">
          <nav aria-label="Tour steps" className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {TOUR_STEPS.map((s, idx) => {
              const isActive = idx === step
              const isPast = idx < step
              return (
                <button
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={`text-left p-2.5 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md font-semibold'
                      : isPast
                        ? 'bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-700'
                        : 'bg-gray-900/40 text-gray-400 border-gray-800 hover:bg-gray-800'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-75">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate mt-1">{s.short}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Detail + Evidence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-900">
                Step {step + 1} of {TOUR_STEPS.length}
              </span>
              <h2 className="text-2xl font-bold text-gray-100 mt-4">{cur.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{cur.who}</p>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{cur.description}</p>

            {cur.details?.table && (
              <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-950/60">
                <table className="w-full text-xs text-left text-gray-300">
                  <thead className="bg-gray-800 text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-700">
                    <tr>
                      {cur.details.table.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {cur.details.table.rows.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-800/40">
                        <td className="px-3.5 py-2.5 font-medium text-gray-100">{r.term}</td>
                        <td className="px-3.5 py-2.5 font-mono text-emerald-400">{r.est}</td>
                        <td className="px-3.5 py-2.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                              r.billed
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-rose-950 text-rose-300 border-rose-800'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cur.details?.points && (
              <ul className="space-y-2 text-xs md:text-sm text-gray-300 pl-4 list-disc marker:text-blue-500">
                {cur.details.points.map((pt, i) => (
                  <li key={i} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-sm font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(TOUR_STEPS.length - 1, s + 1))}
                disabled={step === TOUR_STEPS.length - 1}
                className="px-5 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500 ml-auto hidden sm:inline">
                Press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">
                  ←
                </kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">
                  →
                </kbd>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center border-b border-gray-800 bg-gray-950/60 px-4 pt-2">
              <button
                onClick={() => setActiveTab('screen')}
                className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-mono font-medium border-b-2 transition ${
                  activeTab === 'screen'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Laptop className="w-4 h-4" /> Interactive Screen
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-mono font-medium border-b-2 transition ${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Code className="w-4 h-4" /> On the Wire (API)
              </button>
            </div>

            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              {activeTab === 'screen' ? (
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 shadow-inner min-h-[300px] flex flex-col justify-between gap-4">
                  <Screen type={cur.screenType} />
                  <p className="text-xs text-gray-500 pt-3 border-t border-gray-800 mt-auto">
                    {cur.caption}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <pre className="p-4 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed max-h-[380px]">
                    <code>{cur.code}</code>
                  </pre>
                  <p className="text-xs text-gray-500">{cur.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-950/70 via-gray-900 to-gray-900 border border-blue-900/60 rounded-2xl p-8 md:p-12 text-center shadow-2xl space-y-6">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
            Automated Cornerstone Revenue Recovery
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
            Ready to capture missed charges in your Cornerstone practice?
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Connect Cornerstone Hub once and VetGuard.io audits every visit automatically, with zero
            disruption to your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-950"
            >
              Schedule a 15-Minute Live Demo
            </Link>
            <Link
              href="https://app.vetguard.io"
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Start 14-Day Free Trial
            </Link>
          </div>
          <div className="pt-4 text-xs text-gray-500 flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Read-only Cornerstone Hub API
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
