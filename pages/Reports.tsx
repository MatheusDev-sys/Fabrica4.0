import React from 'react';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';

// Helper function to get report-specific data
const getReportData = (reportTitle: string) => {
  switch (reportTitle) {
    case 'Produção Diária':
      return {
        summary: 'Este relatório apresenta o resumo detalhado da produção diária, incluindo peças produzidas por turno e máquina. Os dados refletem a performance operacional e permitem identificar gargalos e oportunidades de melhoria na linha de produção.',
        headers: ['Máquina', 'Turno', 'Peças Produzidas', 'Meta', 'Eficiência'],
        rows: [
          { cols: ['Torno CNC-A01', '1º Turno', '1.250', '1.500', '83.3%'] },
          { cols: ['Torno CNC-A01', '2º Turno', '1.420', '1.500', '94.7%'] },
          { cols: ['Fresadora V-25', '1º Turno', '850', '1.000', '85.0%'] },
          { cols: ['Fresadora V-25', '2º Turno', '920', '1.000', '92.0%'] },
          { cols: ['Centro Usinagem H-10', '1º Turno', '680', '800', '85.0%'] },
          { cols: ['Centro Usinagem H-10', '2º Turno', '750', '800', '93.8%'] },
        ]
      };
    
    case 'Eficiência (OEE)':
      return {
        summary: 'Este relatório apresenta os indicadores de OEE (Overall Equipment Effectiveness), incluindo disponibilidade, performance e qualidade. Estes dados são fundamentais para avaliar a eficiência global dos equipamentos e identificar oportunidades de otimização.',
        headers: ['Máquina', 'Disponibilidade', 'Performance', 'Qualidade', 'OEE'],
        rows: [
          { cols: ['Torno CNC-A01', '95.2%', '88.5%', '99.1%', '83.5%'] },
          { cols: ['Fresadora V-25', '92.0%', '85.3%', '98.5%', '77.3%'] },
          { cols: ['Centro Usinagem H-10', '88.5%', '91.2%', '99.5%', '80.3%'] },
          { cols: ['Retificadora P-05', '96.8%', '82.1%', '97.8%', '77.7%'] },
          { cols: ['Corte a Laser F-50', '91.5%', '89.8%', '99.8%', '82.0%'] },
        ]
      };
    
    case 'Manutenção':
      return {
        summary: 'Este relatório contém o histórico completo de intervenções de manutenção realizadas, incluindo custos associados, datas e técnicos responsáveis. Essencial para planejamento de manutenção preventiva e controle de custos operacionais.',
        headers: ['ID', 'Máquina', 'Tipo', 'Data', 'Custo (R$)'],
        rows: [
          { cols: ['#MP-0851', 'Prensa Hidráulica PH-250T', 'Preventiva', '25/07/2024', 'R$ 2.850,00'] },
          { cols: ['#MP-0852', 'Centro Usinagem CNC-V3', 'Preventiva', '28/07/2024', 'R$ 1.420,00'] },
          { cols: ['#MP-0853', 'Robô de Solda RS-MIG-04', 'Preventiva', '02/08/2024', 'R$ 890,00'] },
          { cols: ['#MC-0421', 'Torno CNC-A01', 'Corretiva', '15/07/2024', 'R$ 4.200,00'] },
          { cols: ['#MC-0422', 'Fresadora V-25', 'Corretiva', '18/07/2024', 'R$ 3.150,00'] },
        ]
      };
    
    case 'Ocorrências':
      return {
        summary: 'Este relatório registra todas as ocorrências de paradas não programadas e motivos de refugo identificados no período. Fundamental para análise de causa raiz e implementação de ações corretivas para redução de perdas.',
        headers: ['ID', 'Máquina', 'Tipo', 'Data/Hora', 'Duração'],
        rows: [
          { cols: ['#7451', 'Prensa Hidráulica PH-02', 'Vazamento óleo', '24/07/2024 10:30', '2h 15min'] },
          { cols: ['#7450', 'Esteira ET-05', 'Parada inesperada', '24/07/2024 08:15', '1h 45min'] },
          { cols: ['#7449', 'Torno CNC-A01', 'Falha ferramenta', '23/07/2024 14:20', '45min'] },
          { cols: ['#7448', 'Fresadora V-25', 'Refugo dimensional', '23/07/2024 09:10', '30min'] },
          { cols: ['#7447', 'Centro Usinagem H-10', 'Quebra ferramenta', '22/07/2024 16:40', '1h 20min'] },
        ]
      };
    
    case 'Consumo Energético':
      return {
        summary: 'Este relatório apresenta a análise detalhada do consumo energético por máquina em kWh, permitindo identificar equipamentos com alto consumo e oportunidades de economia de energia. Inclui comparativo com períodos anteriores e custos estimados.',
        headers: ['Máquina', 'Consumo (kWh)', 'Custo (R$)', 'Variação', 'Status'],
        rows: [
          { cols: ['Torno CNC-A01', '1.245 kWh', 'R$ 748,00', '+5.2%', 'Normal'] },
          { cols: ['Fresadora V-25', '2.180 kWh', 'R$ 1.308,00', '+12.8%', 'Atenção'] },
          { cols: ['Centro Usinagem H-10', '1.890 kWh', 'R$ 1.134,00', '-2.1%', 'Bom'] },
          { cols: ['Retificadora P-05', '980 kWh', 'R$ 588,00', '+1.5%', 'Normal'] },
          { cols: ['Corte a Laser F-50', '3.420 kWh', 'R$ 2.052,00', '+8.9%', 'Atenção'] },
        ]
      };
    
    case 'Inventário':
      return {
        summary: 'Este relatório detalha a movimentação de peças e matérias-primas no período, incluindo entradas, saídas e níveis de estoque atual. Essencial para gestão de suprimentos, planejamento de compras e controle de custos de armazenagem.',
        headers: ['Código', 'Item', 'Entrada', 'Saída', 'Estoque Atual'],
        rows: [
          { cols: ['PFC-001', 'Eixo de Transmissão Principal', '2.500', '1.850', '12.500'] },
          { cols: ['PFC-002', 'Engrenagem Helicoidal M2', '1.800', '1.420', '8.780'] },
          { cols: ['MAT-105', 'Aço Inox 304 (kg)', '5.000', '3.200', '18.450'] },
          { cols: ['MAT-106', 'Alumínio 6061 (kg)', '3.500', '2.850', '9.320'] },
          { cols: ['PFC-003', 'Flange Aço Inox 316', '800', '650', '4.200'] },
        ]
      };
    
    default:
      return {
        summary: 'Relatório não encontrado.',
        headers: ['Métrica', 'Valor', 'Status'],
        rows: []
      };
  }
};

const Reports: React.FC = () => {
  const { factoryData } = useApp();

  const handleGenerateReport = (title: string) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR');

    // -- Styling --
    const primaryColor = '#0a85ff';
    const secondaryColor = '#1f2937';

    // Header Background
    doc.setFillColor(secondaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Precisium Factory Control", 15, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Relatório: ${title}`, 15, 30);

    // Factory Info
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.text(factoryData.name, 195, 20, { align: 'right' });
    doc.text(`CNPJ: ${factoryData.cnpj}`, 195, 26, { align: 'right' });
    doc.text(date + " " + time, 195, 32, { align: 'right' });

    // Content Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resumo Executivo", 15, 55);

    // Separator
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1);
    doc.line(15, 58, 195, 58);

    // Get report-specific data
    const reportData = getReportData(title);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(reportData.summary, 180);
    doc.text(splitText, 15, 68);

    // Table Area
    let yPos = 100;
    
    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos, 180, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    
    // Dynamic column widths based on number of headers
    const numCols = reportData.headers.length;
    const colWidth = 180 / numCols;
    
    reportData.headers.forEach((header, idx) => {
      doc.text(header, 15 + (idx * colWidth) + 5, yPos + 7);
    });

    // Table Rows
    yPos += 10;
    doc.setFont("helvetica", "normal");
    
    reportData.rows.forEach((row, i) => {
      if (i % 2 !== 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, yPos, 180, 10, 'F');
      }
      
      row.cols.forEach((col, idx) => {
        doc.text(col, 15 + (idx * colWidth) + 5, yPos + 7);
      });
      
      yPos += 10;
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Gerado automaticamente pelo sistema Precisium Factory Control.", 105, 280, { align: 'center' });
    doc.text(`Página 1 de 1`, 195, 280, { align: 'right' });

    doc.save(`Relatorio_${title.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Relatórios</h1>
          <p className="text-gray-500 dark:text-gray-400">Análise de dados e exportação de resultados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Produção Diária', desc: 'Resumo de peças produzidas por turno e máquina.', icon: 'bar_chart' },
          { title: 'Eficiência (OEE)', desc: 'Indicadores de disponibilidade, performance e qualidade.', icon: 'speed' },
          { title: 'Manutenção', desc: 'Histórico de intervenções e custos associados.', icon: 'build' },
          { title: 'Ocorrências', desc: 'Log de paradas e motivos de refugo.', icon: 'warning' },
          { title: 'Consumo Energético', desc: 'Análise de consumo por máquina em kWh.', icon: 'bolt' },
          { title: 'Inventário', desc: 'Movimentação de peças e matérias-primas.', icon: 'inventory' },
        ].map((report, idx) => (
          <button 
            key={idx} 
            onClick={() => handleGenerateReport(report.title)}
            className="flex flex-col text-left w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group card-hover"
          >
            <div className="flex w-full items-start justify-between mb-4">
              <div className="p-3 bg-gray-100 dark:bg-background-dark rounded-lg group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 group-hover:text-primary">{report.icon}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">download</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{report.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{report.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reports;