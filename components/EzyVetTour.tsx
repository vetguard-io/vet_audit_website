'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Code,
  Laptop,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react'

type StepData = {
  short: string
  title: string
  who: string
  dir: 'toClinic' | 'toVG' | 'both' | 'none'
  wire: string
  clinic: { text: string; kind?: 'hot' | 'good' | 'bad' }[]
  vg: { text: string; kind?: 'hot' | 'good' | 'bad' }[]
  description: string
  details?: {
    points?: string[]
    table?: {
      headers: string[]
      rows: { term: string; est: string; status: string }[]
    }
  }
  screenType: 'settings' | 'webhook' | 'sync' | 'consult' | 'audit' | 'workbench' | 'tasks' | 'safetynet'
  caption: string
  code: string
}

const TOUR_STEPS: StepData[] = [
  {
    short: 'Connect',
    title: 'The clinic connects ezyVet once',
    who: 'Clinic administrator in VetGuard settings. Setup takes ~2 minutes.',
    dir: 'toClinic',
    wire: 'POST /v1/oauth/access_token',
    clinic: [{ text: 'Issues OAuth2 API credentials for VetGuard', kind: 'hot' }],
    vg: [
      { text: 'Verifies credentials directly with ezyVet', kind: 'hot' },
      { text: 'Stores client secret with AES-256 encryption' },
    ],
    description:
      'The clinic admin pastes the Client ID and Secret issued by ezyVet support into VetGuard. VetGuard immediately requests a scoped OAuth token so typos are caught instantly and invalid credentials are never saved.',
    details: {
      points: [
        'Credentials are encrypted at rest using envelope encryption and never displayed again.',
        'Tokens are valid for 12 hours; VetGuard automatically renews them 30 minutes before expiration.',
        'The "Test Connection" button re-validates credentials on demand and reports live round-trip latency.',
      ],
    },
    screenType: 'settings',
    caption: 'VetGuard Settings: Connected status, live ezyVet API quota meter, and token health monitoring.',
    code: `POST /v1/oauth/access_token
Content-Type: application/x-www-form-urlencoded

client_id=vetguard-app-live&client_secret=••••••••••••••••&grant_type=client_credentials

← 200 OK
← {
←   "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI...",
←   "token_type": "Bearer",
←   "expires_in": 43200
← }

# Rejected credentials return an immediate 401 error and are discarded without saving.`,
  },
  {
    short: 'Webhook',
    title: 'VetGuard provisions a dedicated webhook address',
    who: 'Clinic admin registers the secure endpoint with ezyVet.',
    dir: 'toClinic',
    wire: 'webhook URL + HMAC-SHA256 secret',
    clinic: [{ text: 'Configured to notify VetGuard on consult & invoice events', kind: 'hot' }],
    vg: [
      { text: 'Unique obfuscated URL provisioned for clinic' },
      { text: 'Cryptographic signing secret generated', kind: 'hot' },
    ],
    description:
      'Periodic polling alone would cause missed charge alerts to arrive minutes late. VetGuard provisions an isolated webhook endpoint with a unique cryptographic secret for ezyVet to sign each notification.',
    details: {
      points: [
        'Every incoming request is verified using HMAC-SHA256 signatures; unsigned or tampered requests are dropped.',
        'Clinic administrators can rotate signing secrets or pause ingestion at any time.',
        'An interactive webhook tester on the settings dashboard validates live deliveries during setup.',
      ],
    },
    screenType: 'webhook',
    caption: 'Webhook Configuration: Clinic-specific ingestion address and X-Ezyvet-Signature header verification.',
    code: `POST /api/v1/integrations/ezyvet/webhook   (admin authenticated)

← 200 OK
← {
←   "webhook_url": "https://api.vetguard.io/v1/webhooks/ezyvet/c_9f8a2b3c4d...",
←   "signing_secret": "whsec_live_9x8w7v6u5t4s3r2q1p...",
←   "signature_header": "X-Ezyvet-Signature"
← }`,
  },
  {
    short: 'First sync',
    title: 'VetGuard audits the past 30 days',
    who: 'Automatic background sync immediately after connecting.',
    dir: 'toClinic',
    wire: 'GET /v2/consult · /v2/invoicelineitem · /v2/animal',
    clinic: [
      { text: 'Buddy: Annual wellness visit (3 unbilled items)', kind: 'hot' },
      { text: 'Luna: Feline dental procedure (2 unbilled items)', kind: 'hot' },
    ],
    vg: [
      { text: 'Historical consults ingested and indexed' },
      { text: '5 missed charges identified across historical records', kind: 'bad' },
    ],
    description:
      'To deliver immediate value on Day 1, VetGuard queries all consults modified within the last 30 days, retrieves matching invoice line items and animal patient histories, and runs full reconciliation.',
    details: {
      points: [
        'All calls respect ezyVet’s 60 calls/minute clinic quota, automatically pacing requests without throttling errors.',
        'Practice managers can backfill older date ranges anytime from the settings panel.',
        'Found unbilled subcutaneous fluids, ear cytology, and meloxicam for Buddy, plus unbilled dental radiographs and buprenorphine for Luna.',
      ],
    },
    screenType: 'sync',
    caption: 'Historical Audit Status: Quota meter displaying remaining calls and historical recovery stats.',
    code: `GET /v2/consult?modified_at={"gte":1788715677}&limit=200&page=1
Authorization: Bearer eyJhbGci...

← 200 OK   x-ratelimit-remaining: 57
← {
←   "meta": { "items_page": 1, "items_page_total": 1, "items_total": 2 },
←   "items": [
←     {
←       "consult": {
←         "id": 5001,
←         "animal_id": 771,
←         "history": "4yr M/N Golden Retriever presented for annual wellness...",
←         "plan": "...SQ fluids 250ml LRS given, ear cytology bilateral..."
←       }
←     }
←   ]
← }`,
  },
  {
    short: 'Consult saved',
    title: 'A veterinarian finishes a consult in ezyVet',
    who: 'Dr. Patel completes Bella’s patient notes. No staff action needed in VetGuard.',
    dir: 'toVG',
    wire: 'POST webhook · consult.created (id: 5003)',
    clinic: [
      { text: 'Notes: cystocentesis, urinalysis, urine culture, Convenia', kind: 'hot' },
      { text: 'Invoice at checkout: exam, urinalysis only' },
    ],
    vg: [
      { text: 'Webhook signature verified via HMAC-SHA256' },
      { text: 'Audit job queued in background queue (202 Accepted)', kind: 'hot' },
    ],
    description:
      'The moment Dr. Patel saves the medical record, ezyVet emits an event webhook. VetGuard verifies the cryptographic payload, acknowledges receipt in under 40ms, and dispatches the reconciliation job.',
    details: {
      points: [
        'Zero clinic lag: VetGuard returns 202 Accepted immediately so ezyVet never experiences webhook timeouts.',
        'De-duplication layer prevents duplicate audits if ezyVet retries the event.',
        'Bella’s SOAP notes document four distinct clinical treatments, while checkout only contains two invoice lines.',
      ],
    },
    screenType: 'consult',
    caption: 'Clinic PMS Side: Bella’s completed consult note, current invoice lines, and outgoing webhook event.',
    code: `POST /api/v1/webhooks/ezyvet/c_9f8a2b3c4d...
Content-Type: application/json
X-Ezyvet-Signature: sha256=4f0c9a2d8e7b1c3a5f6...

{
  "id": "evt_7c758202e14d4256",
  "event": "consult.created",
  "data": { "consult": { "id": 5003 } }
}

← 202 Accepted
← { "status": "queued", "event_id": "evt_7c758202e14d4256" }`,
  },
  {
    short: 'Audit',
    title: 'AI analyzes SOAP notes against invoice lines',
    who: 'VetGuard asynchronous worker engine (takes ~7–13 seconds).',
    dir: 'toClinic',
    wire: 'GET consult · invoice lines · patient',
    clinic: [{ text: 'Responds to 3 read-only API requests' }],
    vg: [
      { text: 'Clinical NLP parses Bella’s SOAP notes', kind: 'hot' },
      { text: '3 billable treatments detected missing from invoice', kind: 'bad' },
    ],
    description:
      'The background worker pulls the full consult text, invoice items, and patient info. VetGuard’s specialized veterinary AI extracts all procedures, tests, and medications, cross-referencing them against the bill.',
    details: {
      table: {
        headers: ['Detected in SOAP Notes', 'Est. Value', 'Invoice Match Status'],
        rows: [
          { term: 'Cystocentesis procedure', est: '$150.00', status: 'Unbilled' },
          { term: 'Convenia antibiotic injection', est: '$95.00', status: 'Unbilled' },
          { term: 'Urine culture (reference lab)', est: '$85.00', status: 'Unbilled' },
        ],
      },
      points: [
        'Websocket push updates open manager dashboards instantly without requiring browser refreshes.',
        'High-confidence discrepancies are highlighted in red for rapid practice review.',
      ],
    },
    screenType: 'audit',
    caption: 'Audit Logs: Ingestion timing, veterinary entity extraction, and discrepancy reconciliation.',
    code: `GET /v2/consult?id=5003&limit=200&page=1
GET /v2/invoicelineitem?consult_id=5003&limit=200&page=1
GET /v2/animal?id=773&limit=200&page=1

# VetGuard Worker Execution Log
[INFO] Extracted 5 clinical items via VetNLP
[INFO] Cross-referenced with 2 invoice line items
[WARN] 3 discrepancies detected on consult #5003 ($330.00 estimated value)
[INFO] Reconciliation completed in 7.2s: status=flagged`,
  },
  {
    short: 'Review',
    title: 'Manager reviews discrepancies side-by-side',
    who: 'Practice manager inside VetGuard Reconciliation Workbench.',
    dir: 'none',
    wire: 'Zero ezyVet calls: VetGuard serves cached copy',
    clinic: [{ text: 'ezyVet unaffected during review' }],
    vg: [{ text: 'SOAP note shown side-by-side with invoice line items', kind: 'hot' }],
    description:
      'The workbench displays the doctor’s SOAP note directly adjacent to the client’s invoice. Missing items are highlighted in context within the note, with estimated fee values and confidence ratings.',
    details: {
      points: [
        'Keyboard-driven speed: Press "t" to push task to ezyVet, "a" to mark added, "d" to dismiss with reason.',
        'Review uses cached data: Zero ezyVet API calls are consumed while staff triage discrepancies.',
        'Audit trail records which staff reviewed each item, timestamps, and reason codes for any dismissed flags.',
      ],
    },
    screenType: 'workbench',
    caption: 'VetGuard Workbench: Bella’s plan text highlighting "Urine culture", missing from the active bill.',
    code: `GET /api/v1/discrepancies/be943770-9a2c-4e8f-8b1d...

← 200 OK
← {
←   "event_description": "Urine culture",
←   "severity": "critical_unbilled",
←   "estimated_value_usd": 85.0,
←   "confidence": 1.0,
←   "detected_terms": ["Urine culture"],
←   "consult": {
←     "id": 5003,
←     "plan": "...Urine culture sent to reference lab for sensitivity..."
←   },
←   "invoice_lines": [
←     { "product_code": "EXAM-STD", "product_name": "Standard consultation", "total": 70.0 },
←     { "product_code": "LAB-UA", "product_name": "Urinalysis (in-house)", "total": 55.0 }
←   ]
← }`,
  },
  {
    short: 'Fix it',
    title: 'Charge is billed in ezyVet and cleared automatically',
    who: 'Reception in ezyVet, or practice manager from VetGuard.',
    dir: 'both',
    wire: 'POST /v2/task · invoicelineitem.created',
    clinic: [
      { text: 'ezyVet Task created: "Unbilled: Urine culture"', kind: 'hot' },
      { text: 'Cystocentesis line added to Bella’s invoice', kind: 'good' },
    ],
    vg: [
      { text: 'Invoice update webhook received from ezyVet' },
      { text: 'Consult re-audited; cystocentesis flag cleared in 6s', kind: 'good' },
    ],
    description:
      'Two frictionless ways to resolve unbilled items: (1) Push a task directly into ezyVet for front desk staff, or (2) Add the charge in ezyVet. As soon as the line item is created, ezyVet notifies VetGuard and the flag clears.',
    details: {
      points: [
        'One-click task creation: Posts directly to ezyVet’s native task queue linked to the consult record.',
        'De-duplication: VetGuard ensures only one task is created per discrepancy.',
        'Closed-loop verification: When reception adds the charge, the flag automatically disappears within 6 seconds.',
      ],
    },
    screenType: 'tasks',
    caption: 'Closed-Loop Workflow: Native task assigned in ezyVet and automatic clearing upon billing.',
    code: `POST /v2/task
Authorization: Bearer eyJhbGci...

{
  "consult_id": "5003",
  "animal_id": "773",
  "title": "Unbilled: Urine culture",
  "description": "VetGuard: Unbilled charge detected (approx $85.00). Documented in Dr. Patel's SOAP plan."
}

← 201 Created
← { "items": [ { "task": { "id": 7001, "status": "pending" } } ] }

# Reception adds Cystocentesis to Bella's bill in ezyVet:
POST /api/v1/webhooks/ezyvet/... { "event": "invoicelineitem.created" }
← 202 Accepted # VetGuard re-audits consult #5003; discrepancy cleared!`,
  },
  {
    short: 'Safety net',
    title: 'Fail-safe resilience when network or systems restart',
    who: 'Automated VetGuard reliability daemon.',
    dir: 'both',
    wire: '5-min sync · hourly token refresh · quota backoff',
    clinic: [
      { text: 'Handles practice system reboots or webhook drops' },
      { text: 'ezyVet rate limit monitored in real time' },
    ],
    vg: [
      { text: 'Periodic polling catches any missed webhooks', kind: 'hot' },
      { text: 'Automatic rate-limit backoff & token refresh', kind: 'hot' },
    ],
    description:
      'Veterinary clinics require 100% uptime without manual maintenance. VetGuard pairs real-time webhooks with a 5-minute polling safety net, token self-healing, and rate-limit preservation.',
    details: {
      points: [
        'Missed webhook protection: 5-minute background sync inspects modified records with a 10-minute overlap.',
        'Rate limit protection: Tracks remaining calls per minute. If budget is exhausted, pauses until reset timestamp.',
        'Token self-healing: Automatically refreshes expiring tokens hourly. If ezyVet returns 401, re-authenticates and retries.',
        'State preservation: Staff dismissal decisions and notes are preserved across re-audits.',
      ],
    },
    screenType: 'safetynet',
    caption: 'Reliability Daemon: Self-healing authentication, rate-limit backoff, and reconciliation fallback.',
    code: `# Scheduled Background Sync (Every 5 minutes)
sync_pms_clinics: modified_at >= last_sync - 10m
refresh_tokens: renew tokens with < 60m remaining

# Rate-limit enforcement (HTTP 429 or x-ratelimit-remaining: 0)
[WARN] Rate limit reached. Sleeping 18.4s until reset...

# Authentication self-healing (seen during clinic PMS restart)
POST /v2/task                  ← 401 Unauthorized
POST /v1/oauth/access_token    ← 200 OK (fresh token acquired)
POST /v2/task                  ← 201 Created (task #7001 created on retry)

GET /api/v1/ezyvet/status
← {
←   "connected": true,
←   "rate_limit_remaining": 57,
←   "rate_limit_limit": 60,
←   "token_ttl_seconds": 43080
← }`,
  },
]

export default function EzyVetTour() {
  const [step, setStep] = useState(0)
  const [activeTab, setActiveTab] = useState<'screen' | 'code'>('screen')

  useEffect(() => {
    const handleHash = () => {
      const match = /^#s(\d)$/.exec(window.location.hash)
      if (match) {
        const idx = Math.min(TOUR_STEPS.length - 1, Math.max(0, Number(match[1]) - 1))
        setStep(idx)
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
        {/* Interactive Systems Stage */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-stretch">
          {/* Clinic ezyVet Card */}
          <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden border-t-4 border-t-amber-600">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="font-bold text-gray-100 text-lg">ezyVet PMS</h3>
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
              Host Clinic Environment
            </p>
          </div>

          {/* Wire Bridge */}
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

          {/* VetGuard Card */}
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

        {/* Step Progress Rail */}
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

        {/* Step Detail + Evidence Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-900">
                Step {step + 1} of {TOUR_STEPS.length}
              </span>
              <h2 className="text-2xl font-bold text-gray-100 mt-4">{cur.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{cur.who}</p>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {cur.description}
            </p>

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
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800">
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

            {/* Stepper Navigation Buttons */}
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
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">→</kbd>
              </span>
            </div>
          </div>

          {/* Right Evidence Column */}
          <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
            {/* Tabs Header */}
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

            {/* Tab Body */}
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              {activeTab === 'screen' ? (
                <div className="space-y-4">
                  {/* High Fidelity Interactive Screen Visualizer */}
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 shadow-inner min-h-[300px] flex flex-col justify-between">
                    {/* Screen simulation based on step */}
                    {cur.screenType === 'settings' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            ezyVet Integration Settings
                          </span>
                          <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                            ● Connected & Healthy
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block">Rate Limit Quota</span>
                            <span className="font-mono font-bold text-gray-200 text-sm">
                              57 / 60 calls remaining
                            </span>
                          </div>
                          <div className="p-3 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block">Token Expiry</span>
                            <span className="font-mono font-bold text-gray-200 text-sm">
                              11h 58m remaining
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 p-3 bg-gray-900 rounded border border-gray-800">
                          <span className="text-gray-500 block mb-1">Clinic Auth Scope:</span>
                          <code className="text-blue-300 font-mono">
                            read-consults, read-invoices, write-tasks
                          </code>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'webhook' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Real-Time Webhook Listener
                          </span>
                          <span className="text-xs text-blue-400 font-mono">Active</span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs font-mono space-y-1">
                          <span className="text-gray-500 block">Webhook Inbound URL:</span>
                          <span className="text-blue-300 break-all">
                            https://api.vetguard.io/v1/webhooks/ezyvet/c_9f8a2b3c4d...
                          </span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs font-mono">
                          <span className="text-gray-500 block mb-1">Header Signature:</span>
                          <span className="text-emerald-400">
                            X-Ezyvet-Signature: sha256=4f0c9a2d8e7b1c3a...
                          </span>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'sync' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Initial 30-Day Historical Sync
                          </span>
                          <span className="text-xs text-emerald-400 font-mono">Completed</span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Consults Audited:</span>
                            <span className="font-mono font-bold text-gray-100">148 consults</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Potential Missed Charges Found:</span>
                            <span className="font-mono font-bold text-rose-400">19 items ($3,420.00)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Average Audit Latency:</span>
                            <span className="font-mono text-blue-400">8.4s / encounter</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'consult' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Consult #5003 — Bella (Canine)
                          </span>
                          <span className="text-xs text-amber-400 font-mono">Dr. Patel</span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs space-y-1">
                          <span className="text-gray-500 block font-semibold">SOAP Clinical Plan:</span>
                          <p className="text-gray-300 leading-relaxed font-mono">
                            ...Cystocentesis performed smoothly. In-house urinalysis completed.
                            Urine culture sent to reference lab for sensitivity. Administered
                            Convenia 80mg/ml SQ...
                          </p>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs">
                          <span className="text-gray-500 block font-semibold mb-1">
                            Current Checkout Invoice (Only 2 Lines):
                          </span>
                          <div className="text-gray-300 font-mono flex justify-between">
                            <span>1. Standard Consultation</span>
                            <span>$70.00</span>
                          </div>
                          <div className="text-gray-300 font-mono flex justify-between">
                            <span>2. Urinalysis (In-house)</span>
                            <span>$55.00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'audit' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Automated AI Reconciliation Output
                          </span>
                          <span className="text-xs text-rose-400 font-bold bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded">
                            3 Missing Charges Flagged
                          </span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs space-y-2">
                          <div className="flex justify-between items-center text-rose-300 font-mono border-b border-gray-800 pb-1">
                            <span>● Cystocentesis</span>
                            <span>Est: $150.00 (High Conf)</span>
                          </div>
                          <div className="flex justify-between items-center text-rose-300 font-mono border-b border-gray-800 pb-1">
                            <span>● Convenia Injection</span>
                            <span>Est: $95.00 (High Conf)</span>
                          </div>
                          <div className="flex justify-between items-center text-rose-300 font-mono">
                            <span>● Urine Culture (Ref Lab)</span>
                            <span>Est: $85.00 (High Conf)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'workbench' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            VetGuard Reconciliation Workbench
                          </span>
                          <span className="text-xs text-blue-400 font-mono">Review Mode</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block font-semibold mb-1">
                              Clinical Record Notes
                            </span>
                            <p className="text-gray-300 font-mono text-[11px] leading-relaxed">
                              Plan: Urine culture sent to reference lab...
                              <mark className="bg-amber-500/30 text-amber-200 px-1 rounded">
                                [Urine culture]
                              </mark>
                            </p>
                          </div>
                          <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block font-semibold mb-1">
                              ezyVet Invoice
                            </span>
                            <div className="text-[11px] font-mono text-gray-300 space-y-0.5">
                              <div>Exam: $70</div>
                              <div>Urinalysis: $55</div>
                              <div className="text-rose-400 font-bold bg-rose-950/60 p-1 rounded mt-1">
                                Missing: Urine culture (~$85)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'tasks' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Closed-Loop Tasking & Re-Audit
                          </span>
                          <span className="text-xs text-emerald-400 font-mono">Resolved</span>
                        </div>
                        <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">ezyVet Native Task Created:</span>
                            <span className="text-emerald-400 font-mono">Task #7001 (Reception)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Reception Billed Item in ezyVet:</span>
                            <span className="text-emerald-400 font-mono">Cystocentesis ($40.00)</span>
                          </div>
                          <div className="flex justify-between items-center border-t border-gray-800 pt-1 text-gray-300 font-bold">
                            <span>Discrepancy Status:</span>
                            <span className="text-emerald-400">Cleared in 6 seconds ✓</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cur.screenType === 'safetynet' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                          <span className="font-bold text-sm text-gray-200">
                            Reliability & Rate-Limit Engine
                          </span>
                          <span className="text-xs text-emerald-400 font-mono">All Systems Green</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block">Fallback Polling:</span>
                            <span className="text-gray-200 font-mono">Every 5 minutes</span>
                          </div>
                          <div className="p-3 bg-gray-900 rounded border border-gray-800">
                            <span className="text-gray-500 block">Rate-Limit Backoff:</span>
                            <span className="text-gray-200 font-mono">Automatic throttling</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <figcaption className="text-xs text-gray-500 pt-3 border-t border-gray-850 mt-auto">
                      {cur.caption}
                    </figcaption>
                  </div>
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

        {/* Enhanced Marketing Call-To-Action Banner (Part 3) */}
        <div className="bg-gradient-to-r from-blue-950/70 via-gray-900 to-gray-900 border border-blue-900/60 rounded-2xl p-8 md:p-12 text-center shadow-2xl space-y-6">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
            Automated ezyVet Revenue Recovery
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
            Ready to capture missed charges in your ezyVet practice?
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Leading veterinary clinics recover $2,000–$5,000 in unbilled services every month with
            VetGuard.io. Integration takes under 15 minutes with zero disruption to your team.
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
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Official ezyVet REST API
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
