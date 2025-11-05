"use client";

import { useState, useEffect, useRef } from "react";
import QRCodeLib from "qrcode";
import { useToast } from "@/app/components/admin/ToastProvider";

interface Menu {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  description?: string;
}

export default function QRCodePage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/menus");
      const data = await res.json();
      if (data.success) {
        setMenus(data.data);
        const activeMenu = data.data.find((m: Menu) => m.isActive);
        if (activeMenu) {
          setSelectedMenuId(activeMenu.id);
        }
      }
    } catch {
      showToast("Erreur chargement menus", "error");
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async () => {
    if (!selectedMenuId) {
      showToast("Veuillez sélectionner un menu", "warning");
      return;
    }

    setGenerating(true);

    try {
      const selectedMenu = menus.find((m) => m.id === selectedMenuId);
      if (!selectedMenu) return;

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const menuUrl = `${baseUrl}/menu/${selectedMenu.slug}`;

      const canvas = canvasRef.current;
      if (canvas) {
        await QRCodeLib.toCanvas(canvas, menuUrl, {
          width: 400,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        const dataUrl = canvas.toDataURL("image/png");
        setQrCodeUrl(dataUrl);
        showToast("QR Code généré", "success");
      }
    } catch (error) {
      showToast("Erreur génération QR Code", "error");
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const selectedMenu = menus.find((m) => m.id === selectedMenuId);
    const filename = `qrcode-menu-${selectedMenu?.slug || "menu"}.png`;

    const link = document.createElement("a");
    link.download = filename;
    link.href = qrCodeUrl;
    link.click();

    showToast("QR Code téléchargé", "success");
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        role="status"
        aria-label="Chargement"
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6" role="main">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          📱 Générateur de QR Code
        </h1>
        <p className="text-base-content/70">
          Générez un QR code pour accéder rapidement à votre menu
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Configuration */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Configuration</h2>

            <div className="form-control">
              <label htmlFor="menu-select" className="label">
                <span className="label-text font-semibold">
                  Sélectionner un menu *
                </span>
              </label>
              <select
                id="menu-select"
                className="select select-bordered select-primary"
                value={selectedMenuId}
                onChange={(e) => setSelectedMenuId(e.target.value)}
                aria-required="true"
                aria-describedby="menu-select-help"
              >
                <option value="" disabled>
                  Choisir un menu
                </option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name} {menu.isActive ? "✓ (Actif)" : ""}
                  </option>
                ))}
              </select>
              <label className="label">
                <span
                  id="menu-select-help"
                  className="label-text-alt text-base-content/70"
                >
                  Le QR code pointera vers ce menu
                </span>
              </label>
            </div>

            {selectedMenuId && (
              <div className="alert alert-info mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-sm font-semibold">URL du menu :</div>
                  <div className="text-xs">
                    {process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}
                    /menu/{menus.find((m) => m.id === selectedMenuId)?.slug}
                  </div>
                </div>
              </div>
            )}

            <div className="card-actions mt-6 justify-end">
              <button
                onClick={generateQRCode}
                className="btn btn-primary btn-block gap-2"
                disabled={!selectedMenuId || generating}
                aria-label="Générer le QR Code"
              >
                {generating ? (
                  <>
                    <span
                      className="loading loading-spinner loading-sm"
                      aria-hidden="true"
                    ></span>
                    Génération...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                      />
                    </svg>
                    Générer le QR Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Aperçu */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Aperçu</h2>

            <div
              className="border-base-300 bg-base-200 flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed p-8"
              role="region"
              aria-label="Aperçu du QR Code"
            >
              {qrCodeUrl ? (
                <div className="text-center">
                  <canvas
                    ref={canvasRef}
                    className="border-base-100 mx-auto rounded-lg border-4 shadow-lg"
                    aria-label="QR Code généré"
                  />
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={downloadQRCode}
                      className="btn btn-primary btn-block gap-2"
                      aria-label="Télécharger le QR Code"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      Télécharger (PNG)
                    </button>
                    <div className="text-base-content/60 text-sm">
                      Résolution: 400x400px
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-base-content/30 mx-auto h-24 w-24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                    />
                  </svg>
                  <p className="text-base-content/50 mt-4">
                    Sélectionnez un menu et cliquez sur &quot;Générer&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="alert mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm">
                <h3 className="font-semibold">Comment utiliser ?</h3>
                <ol className="list-inside list-decimal space-y-1 text-xs">
                  <li>Téléchargez le QR code</li>
                  <li>Imprimez-le ou affichez-le</li>
                  <li>Vos clients le scannent avec leur smartphone</li>
                  <li>Ils accèdent directement au menu</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas caché pour la génération */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </main>
  );
}
